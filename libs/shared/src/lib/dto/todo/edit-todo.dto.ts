import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class EditTodoDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsBoolean()
  isDone: boolean;

  @IsString()
  @IsNotEmpty()
  ownerId: string;
}
