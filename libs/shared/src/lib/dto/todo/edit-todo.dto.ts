import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class EditTodoDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsBoolean()
  @IsOptional()
  isDone: boolean;

  @IsString()
  @IsNotEmpty()
  ownerId: string;
}
