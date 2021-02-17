import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Req, Res, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { UserDto } from 'src/dto/user.dto';
import { PaginatedDto } from 'src/dto/paginated.dto';
import { PaginationDto } from 'src/dto/pagination.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
   constructor(private readonly userService: UserService) { }

   @Get()
   async index(@Query() paginationDto: PaginationDto): Promise<PaginatedDto<User>> {
      const data = await this.userService.index(paginationDto)
      return data
   }

   @ApiOkResponse({ type: UserDto })
   @Get(':id')
   show(@Param('id') id: number): Promise<User> {
      return this.userService.show(id)
   }

   @ApiCreatedResponse({ type: UserDto })
   @Post()
   story(@Body(new ValidationPipe({
      errorHttpStatusCode: 422,
      exceptionFactory: (errors) => new BadRequestException(errors),
   })) data: UserDto) {
      return this.userService.story(data)
   }

   @Put(':id')
   update(@Param('id') id: number, @Body(new ValidationPipe({
      errorHttpStatusCode: 422,
      exceptionFactory: (errors) => new BadRequestException(errors)
   })) data: UserDto) {
      return this.userService.update(id, data);
   }

   @HttpCode(204)
   @Delete(':id')
   delete(@Param('id') id: number) {
      return this.userService.delete(id);
   }
}