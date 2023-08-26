import { Body, Controller, Delete, Get, ParseUUIDPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard';
import { TodoService } from '@trello-demo/data-access-todos';
import { CreateTodoDto, EditTodoDto } from '@trello-demo/shared';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodosController {
  constructor(private readonly todoService: TodoService) { }

  @Get()
  async getAll(@Req() request){
    return await this.todoService.getAll(request.user.id);
  }

  @Post()
  createTodo(@Body() body: CreateTodoDto) {
    return this.todoService.create(body);
  }

  @Put()
  editTodo(@Body() body: EditTodoDto) {
    return this.todoService.edit(body.id, body)
  }

  @Delete()
  removeTodo(@Req() request, @Body('todoId', ParseUUIDPipe) todoId: string ) {
    return this.todoService.destroy(request.user.id, todoId)
  }
}
