import { Controller, ValidationPipe } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { CreateUserDto } from "@trello-demo/shared";
import { UserService } from '@trello-demo/data-access-users';

@Controller()
export class AppController {
  constructor(private userService: UserService){ }

  @EventPattern('create_user')
  async createUser(@Payload(ValidationPipe) data: CreateUserDto) {
    return this.userService.createUser(data);
  }
}
