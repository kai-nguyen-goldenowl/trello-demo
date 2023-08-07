import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaModule } from '@trello-demo/prisma-schema';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [UserService],
  exports: [UserService],
})
export class DataAccessUsersModule {}
