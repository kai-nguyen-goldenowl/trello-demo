import { Injectable } from '@nestjs/common';
import { Todo } from '@prisma/client';
import { TodoService } from '@trello-demo/data-access-todos';
import { CreateLocalFileDto, CreateTodoDto, EditTodoDto } from '@trello-demo/shared';

@Injectable()
export class AppService {
  constructor(private readonly todoService: TodoService ) {}

  async getAll(ownerId: string, query: { take?: number, skip?: number }): Promise<Todo[]>{
    return await this.todoService.getAll(ownerId, query);
  }

  async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    return await this.todoService.create(createTodoDto);
  }

  async editTodo(todoId: string, editTodoDto: EditTodoDto): Promise<Todo> {
    return await this.todoService.edit(todoId, editTodoDto);
  }

  async destroyTodo(ownerId: string, todoId: string): Promise<Todo> {
    return await this.todoService.destroy(ownerId, todoId);
  }

  async uploadFile(todoId: string, file: CreateLocalFileDto){
    return await this.todoService.uploadFile(todoId, file)
  }

  async deleteFile(todoId: string, fileId: string) {
    return await this.todoService.deleteFile(todoId, fileId)
  }

  autoCheckDoneTodos(date: Date) {
    return this.todoService.autoCheckDoneTodos(date)
  }
}
