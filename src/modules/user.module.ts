import { Module } from '@nestjs/common'
import { UserController } from 'src/controllers/user.controller';
import { DatabaseModule } from "../modules/database.module"
import { userProviders } from '../providers/user.providers';
import { UserService } from '../services/user.service';

@Module({
   imports: [DatabaseModule],
   controllers: [UserController],
   providers: [...userProviders, UserService,],
})
export class UserModule { }