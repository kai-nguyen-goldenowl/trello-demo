import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDto } from '@trello-demo/shared/dto';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_MICROSERVICE') private readonly authClient: ClientKafka) {}

  async createUser(createUserDto: CreateUserDto) {}
}
