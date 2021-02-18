import { stat } from "fs"

export class ResponseDto {
   constructor(
      public status: number,
      public message: string,
      public data?: any
   ) { }
}