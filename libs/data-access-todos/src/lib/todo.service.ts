import { Injectable } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { Todo } from "@prisma/client";
import { PrismaService } from "@trello-demo/prisma-schema";
import { CreateTodoDto, EditTodoDto } from "@trello-demo/shared";

@Injectable()
export class TodoService {
  constructor(private prismaService: PrismaService) { }

  async getAll(ownerId: string): Promise<Todo[]> {
    const todos = await this.prismaService.todo.findMany({
      where: {
        ownerId: ownerId
      }
    })

    return todos;
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = await this.prismaService.todo.create({
      data: {
        title: createTodoDto.title,
        description: createTodoDto.description,
        ownerId: createTodoDto.ownerId,
        isDone: createTodoDto.isDone
      }
    });

    return todo;
  }

  async edit(todoId: string, editTodoDto: EditTodoDto): Promise<Todo> {
    try {
      const todo = await this.prismaService.todo.update({
        where: {
          id: todoId
        },
        data: {
          title: editTodoDto.title,
          description: editTodoDto.description,
          isDone: editTodoDto.isDone
        }
      })

      return todo;
    } catch(error) {
      throw new RpcException('Record not found');
    }
  }

  async destroy(ownerId: string, todoId: string): Promise<Todo>{
    try {
      const todo = await this.prismaService.todo.delete({
        where: {
          id: todoId,
          ownerId: ownerId
        }
      })

      return todo;
    } catch {
        throw new RpcException('Record not found');

    }
  }
}
