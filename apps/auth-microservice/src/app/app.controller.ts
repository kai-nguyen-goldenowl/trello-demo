import { Controller, ValidationPipe } from "@nestjs/common";
import { Ctx, EventPattern, KafkaContext, MessagePattern, Payload } from "@nestjs/microservices";
import { CreateUserDto } from "@trello-demo/shared";
import { UserService } from '@trello-demo/data-access-users';

@Controller()
export class AppController {
  constructor(private userService: UserService){ }

  @MessagePattern('create_user')
  async createUser(@Payload(ValidationPipe) data: CreateUserDto) {
    // const user = await this.userService.createUser(data);
    // return user
    console.log(`Create data client: ${data.email}`)
  }

  @MessagePattern('create_user.reply')
  authUser(@Payload() data: any): any {
    console.log(`Helloooooooooooooo ${data}`);
  }
}
