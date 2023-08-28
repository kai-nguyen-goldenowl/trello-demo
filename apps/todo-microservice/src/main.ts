/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'todo-consumer-group',
          sessionTimeout: 60000,
          heartbeatInterval: 40000,
          maxWaitTimeInMs: 43000,
        },
        subscribe: {
          fromBeginning: false
        }
      },
    }
  );

  await app.listen();
}

bootstrap();
