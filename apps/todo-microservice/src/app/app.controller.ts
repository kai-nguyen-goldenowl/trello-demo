import { Controller } from '@nestjs/common';

import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateTodoDto, EditTodoDto } from '@trello-demo/shared';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('todos.get_all')
  async getAll(@Payload() payload){
    return await this.appService.getAll(payload.ownerId);
  }

  @MessagePattern('todos.create')
  async create(@Payload() payload: CreateTodoDto) {
    return await this.appService.createTodo(payload);
  }

  @MessagePattern('todos.edit')
  async edit(@Payload() payload: EditTodoDto) {
    return await this.appService.editTodo(payload.ownerId, payload);
  }

  @MessagePattern('todos.destroy')
  async destroy(@Payload('todoId') todoId: string, @Payload('ownerId') ownerId: string ){
    return await this.appService.destroyTodo(ownerId, todoId);
  }
}
