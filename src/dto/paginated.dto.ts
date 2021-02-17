import { PaginationDto, Page, Pages } from "./pagination.dto"

export class PaginatedDto {
   private data: any[]
   private url: string
   private page: Page
   private pages: Pages

   constructor(paginationDto: PaginationDto, records: number) {
      this.url = paginationDto.url
      this.page = new Page()
      this.page.value = parseInt(paginationDto.page) || 1
      this.page.limit = parseInt(paginationDto.limit) || 10
      this.page.rows = 0
      this.page.offset = 0

      this.pages = new Pages()
      this.pages.count = 0
      this.pages.rows = +records || 0
      this.pages.prior = ''
      this.pages.next = ''

      this.adapter()
   }

   private adapter(): void {
      const url = this.url
      let page = this.page.value || 1
      let limit = this.page.limit || 10
      let records = this.pages.rows
      if (+limit > 10) { limit = 10; this.page.limit = limit }
      let pages = Math.ceil(+records / +limit)
      this.pages.count = pages
      if (page > pages) { page = pages; this.page.value = pages }
      let rows = (page === pages) ? records % limit : limit
      this.page.rows = rows
      const offset = (+page - 1) * +limit
      this.page.offset = offset
      const prior = (page > 1) ? (page - 1) : null
      const next = (page >= pages) ? null : (page + 1)
      if (next !== null) {
         this.pages.next = `${url}?page=${page + 1}&limit=${limit}`
      } else {
         delete this.pages.next
      }
      if (prior !== null) {
         this.pages.prior = `${url}?page=${page - 1}&limit=${limit}`
      } else {
         delete this.pages.prior
      }
   }

   get offset(): number { return this.page.offset || 0 }
   get limit(): number { return this.page.limit || 10 }

   response(data: any) {
      delete this.page.offset
      this.data = data
      return this
   }
}