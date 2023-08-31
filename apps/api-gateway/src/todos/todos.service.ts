import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateTodoDto, CreateLocalFileDto } from '@trello-demo/shared';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class TodosService implements OnModuleDestroy, OnModuleInit {
  constructor(@Inject('TODO_MICROSERVICE') private readonly client: ClientKafka){ }

  async onModuleInit() {
    ['todos.get_all', 'todos.create', 'todos.edit', 'todos.destroy', 'todos.upload_file', 'todos.delete_file'].map((pattern) => {
      this.client.subscribeToResponseOf(pattern);
    })
  }

  async getAll(userId: string){
    return this.client.send('todos.get_all', JSON.stringify({ownerId: userId}))
  }

  async createTodo(ownerId: string, createTodoDto: CreateTodoDto, files: Express.Multer.File[]) {
    const fileList = files.map((file) => {
      return {
        path: file.path,
        filename: file.originalname,
        mimetype: file.mimetype
      }
    })

    return this.client.send('todos.create', JSON.stringify({ownerId: ownerId, title: createTodoDto.title, description: createTodoDto.description, isDone: createTodoDto.isDone, localFiles: fileList}))
  }

  editTodo(ownerId: string, createTodoDto: CreateTodoDto) {
    return lastValueFrom(this.client.send('todos.edit', JSON.stringify({ownerId: ownerId, title: createTodoDto.title, description: createTodoDto.description, isDone: createTodoDto.isDone})))
  }

  destroy(ownerId: string, todoId: string) {
    return this.client.send('todos.destroy', JSON.stringify({ownerId: ownerId, todoId: todoId}))
  }

  uploadFile(todoId: string, file: Express.Multer.File){
    const fileData = {
      path: file.path,
      filename: file.originalname,
      mimetype: file.mimetype
    }

    return this.client.send('todos.upload_file', JSON.stringify({ todoId: todoId, file: fileData }))
  }

  deleteFile(todoId: string, fileId: string){
    return this.client.send('todos.delete_file', JSON.stringify({todoId: todoId, fileId: fileId}))
  }

  async onModuleDestroy() {
    await this.client.close();
  }
}
