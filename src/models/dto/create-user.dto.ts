export class CreateUserDto {
   name: string;
   login: string;
   password: string;
   matrix_id: number;
   is_matrix: boolean;
   reset_password: boolean;
   active: boolean;
}
