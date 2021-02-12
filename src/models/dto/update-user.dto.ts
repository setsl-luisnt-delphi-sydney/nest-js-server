import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
   name: string;
   login: string;
   password: string;
   matrix_id: number;
   is_matrix: boolean;
   reset_password: boolean;
   active: boolean;
}
