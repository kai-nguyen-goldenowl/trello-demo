import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DataAccessUsersModule } from '@trello-demo/data-access-users';

@Module({
  imports: [DataAccessUsersModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
