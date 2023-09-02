import { Injectable } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { Prisma, PrismaService } from "@trello-demo/prisma-schema";
import { MappingPrismaErrorToHttpError, removeFileFromBucket } from "@trello-demo/shared";


@Injectable()
export class LocalFilesService {
  constructor(private readonly prismaService: PrismaService) {}

  async delete(localFileId: string) {
    try {
      const localFile = await this.prismaService.localFile.delete({
        where: {
          id: localFileId
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
}
