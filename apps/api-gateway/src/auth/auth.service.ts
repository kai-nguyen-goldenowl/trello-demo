import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDto } from '@trello-demo/shared/dto';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_MICROSERVICE') private readonly authClient: ClientKafka){}

  createUser(createUserDto: CreateUserDto) {
    return this.authClient.send('create_user', JSON.stringify(createUserDto))
  }
}
