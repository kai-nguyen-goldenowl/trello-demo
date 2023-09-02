import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TodosModule } from './todos/todos.module';
import { LoggerModule } from 'nestjs-pino';
import { ScheduleModule } from '@nestjs/schedule';
import { JobModule } from './jobs/job.module';
import { LocalFileModule } from './local-file/local-file.module';

@Module({
  imports: [
    JobModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    UserModule,
    TodosModule,
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    LocalFileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
