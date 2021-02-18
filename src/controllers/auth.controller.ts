import { Controller, Post, Headers, Ip, Req, Res, HttpStatus } from '@nestjs/common';
import { ResponseDto } from 'src/dto/response.dto';
import { AuthService } from 'src/services/auth.service';

@Controller()
export class AuthController {
   constructor(private readonly authService: AuthService) { }

   @Post('/api/login')
   async loginPost(@Req() req, @Res() res) {

      const data = await this.authService.loginPost(req)

      res.status(data.status).json({ ...data });
   }
}
