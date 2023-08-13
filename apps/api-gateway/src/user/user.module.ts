import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'api-gateway',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'user-consumer-group'
          }
        },
      },
    ]),
  PrismaModule],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
