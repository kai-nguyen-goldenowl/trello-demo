import { Controller } from '@nestjs/common';

import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EditUserDto } from 'libs/shared/src/lib/dto/edit-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('user.edit')
  async edit(@Payload() payload){
    return await this.appService.editUser(payload.userId, payload.editUserDto);
  }
}
