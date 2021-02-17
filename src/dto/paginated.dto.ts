import { PaginationDto } from "./pagination.dto"

export class PaginatedDto<Data> {
   public pageLimit: number
   public offset: number

   public data: Data[]
   public url: string
   public page: number
   public rows: number
   public pages: number
   public records: number
   public priorPage: any
   public nextPage: any

   constructor(paginationDto: PaginationDto, records: number) {
      this.url = paginationDto.url
      this.records = +records || 0
      this.pageLimit = +paginationDto.pageLimit || 10
      this.page = +paginationDto.page || 1
      this.rows = 0
      this.pages = 0
      this.priorPage = ''
      this.nextPage = ''
      this.calcOffset()
   }

   private calcOffset(): void {
      const url = this.url
      let page = +this.page
      let limit = +this.pageLimit
      let records = +this.records
      if (limit > 10) { limit = 10; this.pageLimit = limit }
      this.pages = Math.ceil(records / limit)
      this.rows = records % limit
      if (page > this.pages) { page = this.pages; this.page = page }
      const priorPage = (page > 1) ? (page - 1) : null
      const nextPage = (page >= this.pages) ? null : (page + 1)
      if (nextPage !== null) {
         this.nextPage = `${url}?page=${page + 1}&limit=${limit}`
      } else {
         delete this.nextPage
      }
      if (priorPage !== null) {
         this.priorPage = `${url}?page=${page - 1}&limit=${limit}`
      } else {
         delete this.priorPage
      }
      const offset = (+page - 1) * +limit
      this.offset = offset
   }

   getOffset(): number { return this.offset || 0 }
   getLimit(): number { return this.pageLimit || 10 }
}