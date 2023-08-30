import { Injectable } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { LocalFile, Todo } from "@prisma/client";
import { PrismaService } from "@trello-demo/prisma-schema";
import { CreateTodoDto, EditTodoDto } from "@trello-demo/shared";
import { Prisma } from "@prisma/client";

@Injectable()
export class TodoService {
  constructor(private prismaService: PrismaService) { }

  async getAll(ownerId: string): Promise<Todo[]> {
    const todos = await this.prismaService.todo.findMany({
      where: {
        ownerId: ownerId
      },
      include: {
        localFiles: true
      }
    })

    return todos;
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    let fileData: Array<any> = [];
    if(createTodoDto.localFiles){
      fileData =  createTodoDto.localFiles.map((file) => {
        return {
          path: file.path,
          filename: file.filename,
          mimetype: file.mimetype
        }
      })
    }

    const todo = await this.prismaService.todo.create({
      data: {
        title: createTodoDto.title,
        description: createTodoDto.description,
        ownerId: createTodoDto.ownerId,
        isDone: !!createTodoDto.isDone,
        localFiles: {
          create: fileData
        }
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
      if(error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RpcException(error.message)
      } else {
        throw new RpcException('Record not found')
      }
    }
  }

  async destroy(ownerId: string, todoId: string): Promise<Todo>{
    try {
      const deleteTodo = this.prismaService.todo.delete({
        where: {
          id: todoId,
          ownerId: ownerId
        },
        include: {
          localFiles: true
        }
      })

      const deleteLocalFile = this.prismaService.localFile.deleteMany({
        where: {
          todos: {
            every: {
              id: todoId
            }
          }
        }
      })

      const [todo] = await this.prismaService.$transaction([deleteTodo, deleteLocalFile]);

      return todo;
    } catch(err) {
      if(err instanceof Prisma.PrismaClientKnownRequestError) {
        throw new RpcException(err.message)
      } else {
        throw new RpcException('Record not found')
      }
    }
  }
}
