import { BadRequestException, Body, Controller, Delete, Get, HttpException, Param, ParseUUIDPipe, Post, Put, Query, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateTodoDto, EditTodoDto, LocalFilesInterceptor, RequestWithUser, User } from '@trello-demo/shared';
import { catchError } from 'rxjs';
import { JwtAuthGuard } from '../auth/guard';
import { TodosService } from './todos.service';
import { TodoGuard } from './guard';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodosController {
  constructor(private readonly todoService: TodosService) { }

  @Get()
  async getAll(@User('id') userId: string, @Query() query: { skip?: number, take?: number }){
    return await this.todoService.getAll(userId, query);
  }

  @Post()
  @UseInterceptors(LocalFilesInterceptor({
    fieldName: 'files',
    path: '/todos',
    fileFilter: (req, file, cb) => {
      if(!file.mimetype.includes('image')){
        return cb(new BadRequestException('Provide a valid image'), false)
      }

      cb(null, true);
    },
    limits: {
      fileSize: Math.pow(10240, 2) // 1MB
    }
  }))
  createTodo(@User('id') userId: string, @Body() body: CreateTodoDto, @UploadedFiles() files: Array<Express.Multer.File>) {
    return this.todoService.createTodo(userId, body, files);
  }

  @Put()
  @UseGuards(TodoGuard)
  async editTodo(@Body() body: EditTodoDto) {
    return await this.todoService.editTodo(body.id, body)
  }

  @UseGuards(TodoGuard)
  @Delete()
  async removeTodo(@User('id') userId: string, @Body('todoId', ParseUUIDPipe) todoId: string ) {
    return this.todoService.destroy(userId, todoId).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      })
    )
  }


  @Post(':id/upload')
  @UseGuards(TodoGuard)
  @UseInterceptors(LocalFilesInterceptor({
    fieldName: 'file',
    path: '/todos'
  }))
  uploadFile(@Param('id') todoId: string, @UploadedFiles() file: Array<Express.Multer.File>){
    return this.todoService.uploadFile(todoId, file[0]).pipe(
      catchError((val) => {
        throw new HttpException(val.message, 400);
      })
    )
  }

  @Delete(':id/upload/:fileId')
  @UseGuards(TodoGuard)
  deleteFile(@Param('id') todoId: string, @Param('fileId') fileId: string) {
    return this.todoService.deleteFile(todoId, fileId)
  }
}
