import { IsDecimal, IsEnum, IsInt, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateLeadDto {
  @IsInt() dealerId: number;
  @IsInt() customerId: number;
  @IsString() productType: string; // 'MOBILE'
  @IsNumberString() productPrice: string;
  @IsNumberString() downPayment: string;
}
