import { Injectable } from '@nestjs/common';
import { UserService } from '@trello-demo/data-access-users';
import { EditUserDto } from '@trello-demo/shared';

@Injectable()
export class AppService {
  constructor(private readonly UserService: UserService) { }

  async editUser(userId: string, editUserDto: EditUserDto) {
    return await this.UserService.updateById(userId, editUserDto);
  }
}
