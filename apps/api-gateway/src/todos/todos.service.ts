import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateTodoDto } from '@trello-demo/shared';

@Injectable()
export class TodosService implements OnModuleDestroy, OnModuleInit {
  constructor(@Inject('TODO_MICROSERVICE') private readonly client: ClientKafka){ }

  async onModuleInit() {
    ['todos.get_all', 'todos.create', 'todos.edit', 'todos.destroy'].map((pattern) => {
      this.client.subscribeToResponseOf(pattern);
    })
  }

  async getAll(userId: string){
    return this.client.send('todos.get_all', JSON.stringify({ownerId: userId}))
  }

  createTodo(ownerId: string, createTodoDto: CreateTodoDto) {
    return this.client.send('todos.create', JSON.stringify({ownerId: ownerId, title: createTodoDto.title, description: createTodoDto.description, isDone: createTodoDto.isDone}))
  }

  editTodo(ownerId: string, createTodoDto: CreateTodoDto) {
    return this.client.send('todos.edit', JSON.stringify({ownerId: ownerId, title: createTodoDto.title, description: createTodoDto.description, isDone: createTodoDto.isDone}))
  }

  destroy(ownerId: string, todoId) {
    return this.client.send('todos.destroy', JSON.stringify({ownerId: ownerId, todoId: todoId}))
  }

  async onModuleDestroy() {
    await this.client.close();
  }
}
