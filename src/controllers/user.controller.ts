import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';

@Controller('users')
export class UserController {
   constructor(private readonly userService: UserService) { }

   @Get()
   index(): Promise<User[]> {
      return this.userService.index()
   }

   @Get(':id')
   show(@Param('id') id: string): Promise<User> {
      return this.userService.show(id)
   }

   @Post()
   story(@Body() createUserDto: CreateUserDto) {
      return this.userService.create(createUserDto)
   }

   @Put(':id')
   update(@Param('id') id: string, @Body() updateClientDto: UpdateUserDto) {
      return this.userService.update(+id, updateClientDto);
   }

   @Delete(':id')
   delete(@Param('id') id: string) {
      return this.userService.remove(+id);
   }
}