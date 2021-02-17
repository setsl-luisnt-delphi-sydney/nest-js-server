export class PaginatedDto<Data> {
   public data: Data[]
   public url: string
   public page: number
   public pages: number
   public limit: number
   public records: number
   public priorPage: any
   public nextPage: any

   getData(): Data[] { return this.data || [] }
   setData(value: Data[]) { this.data = value || [] }

   getPage(): number { return this.page || 1 }
   setPage(value: number) { this.page = +value || 1 }

   getLimit(): number { return this.limit || 10 }
   setLimit(value: number) { this.limit = +value || 10 }

   calcOffset(): number {
      const url = this.url
      let page = +this.getPage()
      let limit = +this.getLimit()
      let records = +this.records
      if (limit > 10) { limit = 10; this.setLimit(limit) }
      const countPage = Math.trunc((records / limit))
      const countRestPage = (records % limit)
      const lastPage = countPage + (countRestPage !== 0 ? 1 : 0)
      this.pages = lastPage
      if (page > lastPage) { page = lastPage; this.page = page }
      const priorPage = (page > 1) ? (page - 1) : null
      const nextPage = (page >= lastPage) ? null : (page + 1)
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
      return offset
   }

   getRecords(): number { return this.records || 0 }
   setRecords(value: number) { this.records = +value || 0 }


}