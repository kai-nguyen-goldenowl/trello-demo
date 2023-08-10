import { Controller, ValidationPipe } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { AuthDto, CreateUserDto } from "@trello-demo/shared";
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(private appService: AppService){ }

  @MessagePattern('sign_up.user')
  async signUp(@Payload() CreateUserDto: CreateUserDto) {
    const response = await this.appService.signUp(CreateUserDto);

    return response
  }

  @MessagePattern('sign_in.user')
  async signIn(@Payload() authDto: AuthDto) {
    const response = await this.appService.signIn(authDto);

    return response
  }
}
