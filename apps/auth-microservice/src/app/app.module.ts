import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DataAccessUsersModule } from '@trello-demo/data-access-users';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '@trello-demo/prisma-schema';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [DataAccessUsersModule, ConfigModule.forRoot({
    isGlobal: true
  }), JwtModule.register({}), PrismaModule],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
