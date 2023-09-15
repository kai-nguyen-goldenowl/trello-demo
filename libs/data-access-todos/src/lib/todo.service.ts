import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { RpcException } from "@nestjs/microservices";
import { LocalFile, Prisma, Todo } from "@prisma/client";
import { PrismaService } from "@trello-demo/prisma-schema";
import { CreateLocalFileDto, CreateTodoDto, EditTodoDto, MappingPrismaErrorToHttpError, removeFileFromBucket } from "@trello-demo/shared";

@Injectable()
export class TodoService {
  constructor(private prismaService: PrismaService) { }

  async getAll(ownerId: string, query: { take?: number, skip?: number }): Promise<Todo[]> {
    const { take, skip } = query;
    let todos;

    if(isNaN(Number(skip))){
      todos = await this.prismaService.todo.findMany({
        take: Number(take),
        where: {
          ownerId: ownerId
        },
        include: {
          localFiles: true
        }
      })
    } else {
      todos = await this.prismaService.todo.findMany({
        take: Number(take),
        skip: Number(skip),
        where: {
          ownerId: ownerId
        },
        include: {
          localFiles: true
        }
      })
    }

    return todos;
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    let fileData: Array<any> = [];
    if(createTodoDto.localFiles){
      fileData = createTodoDto.localFiles.map((file: CreateLocalFileDto) => {
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
        autoDone: !!createTodoDto.autoDone,
        dueDate: new Date(createTodoDto.dueDate),
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
      const todo = await this.prismaService.todo.delete({
        where: {
          id: todoId,
          ownerId: ownerId
        },
        include: {
          localFiles: true
        }
      })

      todo.localFiles.forEach((localFile) => {
        removeFileFromBucket(localFile.path)
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
      const localFile = await this.prismaService.localFile.delete({
        where: {
          id: fileId,
          ownerId: todoId,
          ownerType: 'Todo'
        }
      })

      removeFileFromBucket(localFile.path)
      return localFile;
    } catch(err) {
      if(err instanceof Prisma.PrismaClientKnownRequestError) {
        throw MappingPrismaErrorToHttpError(err)
      } else {
        throw new RpcException('Record not found')
      }
    }
  }

  async autoCheckDoneTodos(date: Date){
    try {
      await this.prismaService.todo.updateMany({
        where: {
          autoDone: true,
          isDone: false,
          dueDate: new Date(date)
        },
        data: {
          isDone: true
        }
      })
    } catch(err) {
      if(err instanceof Prisma.PrismaClientKnownRequestError) {
        throw MappingPrismaErrorToHttpError(err)
      } else {
        throw new RpcException('Record not found')
      }
    }
  }
}
