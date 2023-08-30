import { Module } from '@nestjs/common';
import { PrismaService } from '@trello-demo/prisma-schema';
import { LocalFilesService } from './local-files.service';

@Module({
  imports: [PrismaService],
  controllers: [],
  providers: [LocalFilesService],
  exports: [LocalFilesService],
})
export class DataAccessLocalFilesModule {}
