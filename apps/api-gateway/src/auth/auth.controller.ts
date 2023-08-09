import { Body, Controller, Get, Inject, OnModuleInit, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '@trello-demo/shared';
import { ClientKafka } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, @Inject('AUTH_MICROSERVICE') private client: ClientKafka) { }

  // @Client({
  //   transport: Transport.KAFKA,
  //   options: {
  //     client: {
  //       clientId: 'kafkaSample',
  //       brokers: ['localhost:9092'],
  //     },
  //     consumer: {
  //       groupId: 'auth-consumer' // Should be the same thing we give in consumer
  //     }
  //   }
  // })
  // client: ClientKafka;

  async onModuleInit() {
    // Need to subscribe to topic
    // so that we can get the response from kafka microservice
    this.client.subscribeToResponseOf('create_user');
    await this.client.connect();
    console.log(this.client)
  }

  @Post('sign-in')
  async signIn(@Body() createUserDto: CreateUserDto) {
    const user = await this.client.send('create_user', JSON.stringify(createUserDto)).subscribe((value) => {
      console.log(value);
    });

    return true;
  }
}
