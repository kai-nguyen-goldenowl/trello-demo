/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerErrorInterceptor, Logger as LoggerPino } from 'nestjs-pino';
import { ExceptionFilter } from '@trello-demo/shared';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = 3000;

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));

  app.useLogger(app.get(LoggerPino))
  app.useGlobalInterceptors(new LoggerErrorInterceptor())
  app.useGlobalFilters(new ExceptionFilter())
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
