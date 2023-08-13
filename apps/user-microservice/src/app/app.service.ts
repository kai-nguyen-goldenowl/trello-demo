import { Injectable } from '@nestjs/common';
import { UserService } from '@trello-demo/data-access-users';
import { EditUserDto } from '../../../../libs/shared/src/lib/dto/edit-user.dto';

@Injectable()
export class AppService {
  constructor(private UserService: UserService) { }

  async editUser(userId: string, editUserDto: EditUserDto) {
    return await this.UserService.updateById(userId, editUserDto);
  }
}
