import { Body, Controller, Delete, Get, HttpException, ParseUUIDPipe, Post, Put, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateTodoDto, EditTodoDto, LocalFilesInterceptor, RequestWithUser } from '@trello-demo/shared';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from '../auth/guard';
import { TodosService } from './todos.service';
import { catchError } from 'rxjs';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodosController {
  constructor(private readonly todoService: TodosService) { }

  @Get()
  async getAll(@Req() request){
    return await this.todoService.getAll(request.user.id);
  }

  @Post()
  @UseInterceptors(LocalFilesInterceptor({
    fieldName: 'files',
    path: '/todos'
  }))
  createTodo(@Req() request: RequestWithUser, @Body() body: CreateTodoDto, @UploadedFiles() files: Array<Express.Multer.File>) {
    return this.todoService.createTodo(request.user.id, body, files);
  }

  @Put()
  editTodo(@Body() body: EditTodoDto) {
    return this.todoService.editTodo(body.id, body)
  }

  @Delete()
  removeTodo(@Req() request, @Body('todoId', ParseUUIDPipe) todoId: string ) {
    return this.todoService.destroy(request.user.id, todoId).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      })
    )
  }
}
