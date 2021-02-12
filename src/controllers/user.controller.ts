import { Controller, Get } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
   constructor(private readonly userService: UserService) { }

   @Get()
   async index(): Promise<User[]> {
      return this.userService.index()
   }
}