import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateDealerDto {
  @IsString() @IsNotEmpty() name: string;
  @IsString() @IsNotEmpty() ownerName: string;
  @IsString() @Length(10, 20) mobile: string;
  @IsEmail() email: string;
  @IsString() shopAddress: string;
  @IsString() city: string;
  @IsString() state: string;
  @IsString() @Length(5, 10) pincode: string;
  @IsOptional() @IsString() gstNumber?: string;
  @IsOptional() @IsString() panNumber?: string;
  @IsOptional() extra?: any;
}
