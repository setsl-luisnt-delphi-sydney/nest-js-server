import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, isEmail, IsNumber } from 'class-validator'

export class UserDto {
   @ApiProperty() @IsString() @IsNotEmpty()
   name: string

   @ApiProperty() @IsString() @IsNotEmpty()
   login: string

   @ApiProperty() @IsString() @IsNotEmpty()
   password: string

   @ApiProperty() @IsNumber() @IsNotEmpty()
   matrix_id: number

   @ApiProperty() @IsNumber() @IsNotEmpty()
   is_matrix: boolean

   @ApiProperty() @IsNumber() @IsNotEmpty()
   reset_password?: boolean

   @ApiProperty() @IsNumber() @IsNotEmpty()
   active?: boolean
}
