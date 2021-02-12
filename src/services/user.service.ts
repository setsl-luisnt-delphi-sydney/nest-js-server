import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
   constructor(
      @Inject('USER_REPOSITORY')
      private userRepository: Repository<User>,
   ) { }

   async index(): Promise<User[]> {
      return this.userRepository.find();
   }
}