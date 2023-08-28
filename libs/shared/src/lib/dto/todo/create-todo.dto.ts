import { IsOptional, IsNotEmpty, IsString, IsBoolean } from "class-validator";

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsBoolean()
  @IsOptional()
  isDone: boolean;

  @IsString()
  @IsNotEmpty()
  ownerId: string;
}
