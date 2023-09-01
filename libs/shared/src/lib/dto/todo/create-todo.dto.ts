import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreateLocalFileDto } from "../local-file/create-local-file.dto";

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  isDone: boolean;

  @IsDateString()
  @IsOptional()
  dueDate: Date;

  @IsOptional()
  autoDone: boolean;

  @IsString()
  @IsNotEmpty()
  ownerId: string;

  @IsOptional()
  localFiles?: CreateLocalFileDto[];
}
