import { Module } from '@nestjs/common';
import { PrismaModule } from '@trello-demo/prisma-schema';
import { LocalFilesService } from './local-files.service';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [LocalFilesService],
  exports: [LocalFilesService],
})
export class DataAccessLocalFilesModule {}
