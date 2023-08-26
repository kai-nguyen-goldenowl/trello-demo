import { IsNotEmpty, IsString, isBoolean } from "class-validator";

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @isBoolean()
  isDone: boolean;

  @IsString()
  @IsNotEmpty()
  ownerId: string;
}
