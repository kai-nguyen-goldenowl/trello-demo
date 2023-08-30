import { IsNotEmpty } from "class-validator";
import { CreateLocalFileDto } from "../local-file/create-local-file.dto";

export class CreateLocalFileOnTodosDto {
  @IsNotEmpty()
  localFile: CreateLocalFileDto
}
