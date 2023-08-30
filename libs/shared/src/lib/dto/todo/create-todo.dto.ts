import { IsOptional, IsNotEmpty, IsString, IsBoolean } from "class-validator";
import { CreateLocalFileDto } from "../local-file/create-local-file.dto";

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  isDone: boolean;

  @IsString()
  @IsNotEmpty()
  ownerId: string;

  @IsOptional()
  localFiles?: CreateLocalFileDto[];
}
