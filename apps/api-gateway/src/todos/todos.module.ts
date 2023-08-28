import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TODO_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'api-gateway-todo',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'todo-consumer-group'
          }
        }
      }
    ])
  ],
  providers: [TodosService],
  controllers: [TodosController],
  exports: [TodosService]
})
export class TodosModule {}
