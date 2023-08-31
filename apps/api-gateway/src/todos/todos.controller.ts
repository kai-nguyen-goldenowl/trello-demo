import { BadRequestException, Body, Controller, Delete, Get, HttpException, Param, ParseUUIDPipe, Post, Put, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateTodoDto, EditTodoDto, LocalFilesInterceptor, RequestWithUser } from '@trello-demo/shared';
import { catchError } from 'rxjs';
import { JwtAuthGuard } from '../auth/guard';
import { TodosService } from './todos.service';

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

  @Post(':id/upload')
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
  deleteFile(@Param('id') todoId: string, @Param('fileId') fileId: string) {
    return this.todoService.deleteFile(todoId, fileId)
  }
}
