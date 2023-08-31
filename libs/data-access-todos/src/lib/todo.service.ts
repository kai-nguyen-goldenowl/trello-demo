import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { RpcException } from "@nestjs/microservices";
import { LocalFile, Prisma, Todo } from "@prisma/client";
import { PrismaService } from "@trello-demo/prisma-schema";
import { CreateLocalFileDto, CreateTodoDto, EditTodoDto, MappingPrismaErrorToHttpError } from "@trello-demo/shared";

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
      fileData =  createTodoDto.localFiles.map((file: CreateLocalFileDto) => {
        return {
          path: file.path,
          filename: file.filename,
          mimetype: file.mimetype,
          ownerType: 'Todo'
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
      },
      include: {
        localFiles: true
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
        throw MappingPrismaErrorToHttpError(error)
      } else {
        throw new RpcException('Record not found')
      }
    }
  }

  async destroy(ownerId: string, todoId: string): Promise<Todo>{
    try {
      const todo = this.prismaService.todo.delete({
        where: {
          id: todoId,
          ownerId: ownerId
        },
        include: {
          localFiles: true
        }
      })

      return todo;
    } catch(err) {
      if(err instanceof Prisma.PrismaClientKnownRequestError) {
        throw MappingPrismaErrorToHttpError(err)
      } else {
        throw new RpcException('Record not found')
      }
    }
  }

  async uploadFile(todoId: string, file: CreateLocalFileDto): Promise<LocalFile>{
    try {
      const localFile = this.prismaService.localFile.create({
        data: {
          path: file.path,
          filename: file.filename,
          mimetype: file.mimetype,
          ownerId: todoId,
          ownerType: 'Todo'
        }
      })

      return localFile
    } catch(err) {
      if(err instanceof Prisma.PrismaClientKnownRequestError) {
        throw MappingPrismaErrorToHttpError(err)
      } else {
        throw new RpcException(new InternalServerErrorException('Server Error'))
      }
    }
  }

  async deleteFile(todoId: string, fileId: string) {
    try {
      const localFile = this.prismaService.localFile.delete({
        where: {
          id: fileId,
          ownerId: todoId,
          ownerType: 'Todo'
        }
      })

      return localFile;
    } catch(err) {
      if(err instanceof Prisma.PrismaClientKnownRequestError) {
        throw MappingPrismaErrorToHttpError(err)
      } else {
        throw new RpcException('Record not found')
      }
    }
  }
}
