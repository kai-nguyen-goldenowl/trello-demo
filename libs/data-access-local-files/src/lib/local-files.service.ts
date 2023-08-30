import { Injectable } from "@nestjs/common";
import { PrismaService } from "@trello-demo/prisma-schema";

@Injectable()
export class LocalFilesService {
  constructor(private readonly prismaService: PrismaService)
}
