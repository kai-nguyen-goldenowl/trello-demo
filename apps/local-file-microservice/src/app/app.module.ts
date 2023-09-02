import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataAccessLocalFilesModule } from '@trello-demo/data-access-local-files';

@Module({
  imports: [DataAccessLocalFilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
