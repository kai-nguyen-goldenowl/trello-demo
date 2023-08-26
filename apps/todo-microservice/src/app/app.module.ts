import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataAccessTodosModule } from '@trello-demo/data-access-todos';

@Module({
  imports: [DataAccessTodosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
