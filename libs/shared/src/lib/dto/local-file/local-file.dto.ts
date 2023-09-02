import { IsNotEmpty, IsString } from "class-validator";

export class LocalFileDto {
  @IsString()
  @IsNotEmpty()
  path: string;

  @IsString()
  @IsNotEmpty()
  filename: string

  @IsString()
  @IsNotEmpty()
  mimetype: string;
}
