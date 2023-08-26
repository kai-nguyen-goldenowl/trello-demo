import { Module } from '@nestjs/common';
import { PrismaModule } from '@trello-demo/prisma-schema';
import { TodoService } from './todo.service';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [TodoService],
  exports: [TodoService],
})
export class DataAccessTodosModule {}
