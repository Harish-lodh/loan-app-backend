import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from '../../common/roles.enum';

export class CreateUserDto {
  @IsString() name: string;
  @IsEmail() email: string;
  @IsOptional() @IsString() mobile?: string;
  @MinLength(6) password: string;
  @IsOptional() @IsEnum(Role) role?: Role;
}
