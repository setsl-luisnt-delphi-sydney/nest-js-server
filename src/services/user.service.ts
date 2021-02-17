import { Injectable, Inject, HttpCode, Req, Res } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserDto } from 'src/dto/user.dto';
import { PaginationDto } from 'src/dto/pagination.dto';
import { PaginatedDto } from 'src/dto/paginated.dto';

@Injectable()
export class UserService {
   constructor(
      @Inject('USER_REPOSITORY')
      private userRepository: Repository<User>,
   ) { }

   async index(paginationDto: PaginationDto): Promise<PaginatedDto<User>> {
      const dataDto = new PaginatedDto<User>(paginationDto, await this.userRepository.count())
      const offset = await dataDto.getOffset()
      const limit = await dataDto.getLimit()

      dataDto.data = await this.userRepository.createQueryBuilder()
         .offset(offset).limit(limit)
         .getMany()

      return dataDto
   }

   async show(id: number): Promise<User> {
      const data = await this.userRepository.findOneOrFail(id)
      data.id = +data.id
      return data
   }

   async story(userDto: UserDto): Promise<User> {
      const data = await this.userRepository.save(userDto)
      data.id = +data.id
      return { id: data.id, ...data }
   }

   async update(id: number, userDto: UserDto): Promise<User> {
      await this.show(id)
      const data = await this.userRepository.update(id, userDto)
      return this.show(id)
   }

   async delete(id: number): Promise<void> {
      await this.show(id)
      const data = await this.userRepository.delete(id)
   }
}