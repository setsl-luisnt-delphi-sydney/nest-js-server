import { Response } from "express"

export class PaginationDto {
   page: number = 1
   limit: number = 10
   req: Request
   res: Response

   getUrl() { return this.req.url }

   ajusts() {
      if (this.page === undefined) {
         this.res.redirect(this.req.url + '?page=1&limit=1')
      }
   }
}