import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '@trello-demo/shared';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('sign-in')
  signIn(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto)
  }
}
