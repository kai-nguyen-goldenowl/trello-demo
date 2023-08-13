import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class EditUserDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @MinLength(6)
  @IsOptional()
  currentPassword: string;

  @IsString()
  @MinLength(6)
  @IsOptional()
  newPassword: string;

  @IsString()
  @MinLength(6)
  @IsOptional()
  newPasswordConfirm: string;
}
