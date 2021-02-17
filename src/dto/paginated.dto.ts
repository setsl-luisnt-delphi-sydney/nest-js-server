export class PaginatedDto<Data> {
   public data: Data[]
   public page: number
   public limit: number
   public records: number
   public url: string

   getData(): Data[] { return this.data || [] }
   setData(value: Data[]) { this.data = value || [] }

   getPage(): number { return this.page || 1 }
   setPage(value: number) { this.page = value || 1 }

   getLimit(): number { return this.limit || 10 }
   setLimit(value: number) { this.limit = value || 10 }

   getOffset(): number { return (this.getPage() - 1) * this.getLimit() }

   getRecords(): number { return this.records || 0 }
   setRecords(value: number) { this.records = value || 0 }
}