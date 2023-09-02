import { Body, Controller, Get, Put, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtAuthGuard } from "../auth/guard";
import { EditUserDto, User } from '@trello-demo/shared';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('me')
  me(@User() user){
    return user;
  }

  @Put('me')
  async editUser(@User('id') userId: string, @Body() editUserDto: EditUserDto){
    return await this.userService.editUser(userId, editUserDto);
  }
}
