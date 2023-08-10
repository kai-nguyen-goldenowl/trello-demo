import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AuthDto, CreateUserDto } from '@trello-demo/shared/dto';

@Injectable()
export class AuthService implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject('AUTH_MICROSERVICE') private readonly client: ClientKafka){}

  async onModuleInit() {
    ['sign_up.user', 'sign_in.user'].map((pattern) => {
      this.client.subscribeToResponseOf(pattern);
    })

    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  async signUp(createUserDto: CreateUserDto) {
    return this.client.send('sign_up.user', JSON.stringify(createUserDto));
  }

  async signIn(authDto: AuthDto) {
    return this.client.send('sign_in.user', JSON.stringify(authDto))
  }
}
