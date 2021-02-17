export class Page {
   value: number
   limit: number
   offset: number
   rows: number
}

export class Pages {
   count: number
   rows: number
   prior: string
   next: string
}

export class PaginationDto {
   url: string
   page: string
   limit: string
}