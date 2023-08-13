import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { EditUserDto } from '../../../../libs/shared/src/lib/dto/edit-user.dto';

@Injectable()
export class UserService implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject('USER_MICROSERVICE') private readonly client: ClientKafka) {}

  async onModuleInit() {
    ['user.edit'].map((pattern) => {
      this.client.subscribeToResponseOf(pattern);
    })

    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  async editUser(userId: string, editUserDto: EditUserDto){
    return this.client.send('user.edit', JSON.stringify({userId: userId, editUserDto: editUserDto}));
  }
}
