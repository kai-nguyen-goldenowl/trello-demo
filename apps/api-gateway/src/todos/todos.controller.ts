import { Body, Controller, Delete, Get, ParseUUIDPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard';
import { TodosService } from './todos.service';
import { CreateTodoDto, EditTodoDto, RequestWithUser } from '@trello-demo/shared';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodosController {
  constructor(private readonly todoService: TodosService) { }

  @Get()
  async getAll(@Req() request){
    return await this.todoService.getAll(request.user.id);
  }

  @Post()
  createTodo(@Req() request: RequestWithUser, @Body() body: CreateTodoDto) {
    return this.todoService.createTodo(request.user.id, body);
  }

  @Put()
  editTodo(@Body() body: EditTodoDto) {
    return this.todoService.editTodo(body.id, body)
  }

  @Delete()
  removeTodo(@Req() request, @Body('todoId', ParseUUIDPipe) todoId: string ) {
    return this.todoService.destroy(request.user.id, todoId)
  }
}
