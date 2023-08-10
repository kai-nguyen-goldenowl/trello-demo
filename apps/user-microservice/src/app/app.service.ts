import { Injectable } from '@nestjs/common';
import { UserService } from '@trello-demo/data-access-users';

@Injectable()
export class AppService {
  constructor(private UserService: UserService) { }
}
