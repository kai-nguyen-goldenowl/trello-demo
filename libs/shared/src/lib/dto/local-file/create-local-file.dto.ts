import { IsNotEmpty, IsOptional, IsString } from "class-validator";

enum LocalFileOwnerType {
  Todo
}

export class CreateLocalFileDto {
  @IsString()
  @IsNotEmpty()
  path: string;

  @IsString()
  @IsNotEmpty()
  filename: string

  @IsString()
  @IsNotEmpty()
  mimetype: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  ownerId?: string;

  @IsString()
  @IsOptional()
  ownerType?: LocalFileOwnerType;
}
