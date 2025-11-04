import { IsString, IsNotEmpty, IsOptional, IsEmail, IsNumber, Length } from 'class-validator';

export class CreateCustomerDto {
  // ✅ Basic details
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @Length(10, 10)
  mobile: string;

  // ✅ Relation to dealer
  @IsNumber()
  @IsNotEmpty()
  dealerId: number;

  // ✅ KYC info
  @IsString()
  @IsOptional()
  panNumber?: string;

  @IsString()
  @IsOptional()
  aadharNumber?: string;

  // ✅ Address info
  @IsString()
  @IsOptional()
  addressLine1?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  pincode?: string;

  // ✅ Optional status field
  @IsString()
  @IsOptional()
  status?: string;
}
