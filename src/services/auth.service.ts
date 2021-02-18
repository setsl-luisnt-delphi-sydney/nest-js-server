import { HttpStatus, Injectable, Req } from '@nestjs/common'
import { createHash, createHmac } from 'crypto'
import { ResponseDto } from 'src/dto/response.dto'
import { User } from 'src/entities/user.entity'
import { getRepository } from 'typeorm'

const USR = 0
const PWD = 1

@Injectable()
export class AuthService {
   private ip: string
   private authorization: string
   private auth: string
   private fields: any
   private user: User
   private token: string
   private responseDto: ResponseDto


   check(value: string): any {

   }

   async loginPost(req: any): Promise<ResponseDto> {
      this.ip = req.ip.replace('::ffff:', '')
      this.authorization = req.headers["authorization"]
      // Validar se veio authorization
      if (this.isBadRequest()) return this.responseDto

      // Validar se veio parte base64(user:pass) em authorization
      if (await this.isPreconditionFailed()) return this.responseDto

      // Validar os dados de acesso base64(user:pass) no usuário
      if (await this.isUnauthorized()) return this.responseDto

      return await this.generateResponse()
   }

   private isBadRequest(): any {
      if (this.authorization === '') {
         this.responseDto = new ResponseDto(400, 'Bad Request - Authorization Is Empty')
         return true
      }
      if (!this.authorization) {
         this.responseDto = new ResponseDto(400, 'Bad Request - Authorization Not Found')
         return true
      }
      this.auth = this.authorization.split(' ')[1]
      if (!this.auth) {
         this.responseDto = new ResponseDto(400, 'Bad Request - Authorization Invalid')
         return true
      }
      return false
   }

   private isPreconditionFailed(): any {
      this.fields = Buffer.from(this.auth, 'base64').toString('ascii').split(':')
      if (!this.fields) {
         this.responseDto = new ResponseDto(HttpStatus.PRECONDITION_FAILED, 'Precondition Failed - Field Not Exists')
         return true
      }
      if (this.fields.length !== 2) {
         this.responseDto = new ResponseDto(HttpStatus.PRECONDITION_FAILED, 'Precondition Failed - Field Not Found')
         return true
      }
      return false
   }

   private async isUnauthorized(): Promise<User | any> {
      const login = this.fields[USR]
      const pwd = this.fields[PWD]
      const pwd256 = await createHash('sha256').update(pwd).digest('hex')
      const user = getRepository(User)
      const data = await user.findOne({ login })

      if (!data) {
         this.responseDto = new ResponseDto(HttpStatus.UNAUTHORIZED, 'Unauthorized - Access deny')
         return true
      }
      if (data.password !== pwd256) {
         this.responseDto = new ResponseDto(HttpStatus.UNAUTHORIZED, 'Unauthorized - For This User')
         return true
      }

      this.user = data

      return false
   }

   generateResponse(): ResponseDto {
      const now = require('moment')().utcOffset("-03:00")

      const base64 = typeof atob !== 'undefined' ? atob : value => Buffer.from(value).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
      const u = this.user
      // Headers
      const tpy = "JWT"
      const alg = "HS256"
      // Payload
      const jti = +u.id                    // jti - Jwt ID - Jwt ID(ID)
      const iss = u.login                  // iss - Issuer - Emissor(Emissor)
      const sub = 'Access Api'             // sub - Subject - Assunto
      const aud = this.ip                  // aud - Audience - Audiência(Remote IP)
      const iat = now.format()                 // iat - Issued At - Emitido em(Quando o Token foi Emitido / Automático)
      const exp = now.add(2, 'hours').format() // exp - Expiration Time - Validade Terminada(Expirar Em)

      const payload = { jti, iss, sub, aud, iat, exp }
      const h64 = base64(JSON.stringify({ tpy, alg }))
      const p64 = base64(JSON.stringify(payload))
      const body = `${h64}.${p64}`

      const signature =
         createHmac('sha256', 'your-256-bit-secret').update(body).digest('base64')
            .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')

      const token = `${body}.${signature}`

      const data = { payload, token }

      return new ResponseDto(HttpStatus.CREATED, 'O Token de acesso foi criado com sucesso', data)
   }

}
