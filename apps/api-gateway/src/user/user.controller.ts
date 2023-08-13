import { Body, Controller, Get, Put, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtAuthGuard } from "../auth/guard";
import { EditUserDto } from "libs/shared/src/lib/dto/edit-user.dto";

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('me')
  me(@Req() request){
    return request.user;
  }

  @Put('me')
  async editUser(@Req() request, @Body() editUserDto: EditUserDto){
    return await this.userService.editUser(request.user.id, editUserDto);
  }
}
