import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
   constructor(
      @Inject('USER_REPOSITORY')
      private userRepository: Repository<User>,
   ) { }

   index(): Promise<User[]> {
      return this.userRepository.find();
   }

   show(id: string): Promise<User> {
      return this.userRepository.findOne(+id)
   }

   create(createUserDto: CreateUserDto) {
      return this.userRepository.create({ ...createUserDto })
   }

   update(id: number, updateUserDto: UpdateUserDto) {
      return this.userRepository.update(id, { ...updateUserDto })
   }

   remove(id: number) {
      return this.userRepository.delete(id)
   }
}