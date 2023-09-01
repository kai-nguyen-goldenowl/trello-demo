import { Module } from "@nestjs/common";
import { JobService } from './job.service';
import { ClientsModule, Transport } from "@nestjs/microservices";

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
  providers: [JobService]
})

export class JobModule {}
