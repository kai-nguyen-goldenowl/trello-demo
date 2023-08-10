import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthDto, CreateUserDto } from '@trello-demo/shared';
import { Response } from 'express';
import { catchError, of } from 'rxjs';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/index';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('sign-up')
  async signUp(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    (await this.authService.signUp(createUserDto)).pipe(catchError(val => of({ error: val.message }))).subscribe({
      next: (user: User) => {
        res.send({
          data: user
        })
      }
    })
  }

  @Post('sign-in')
  async SignIn(@Body() authDto: AuthDto, @Res() res: Response) {
    (await this.authService.signIn(authDto)).pipe(catchError(val => of({error: val.message}))).subscribe({
      next: (data) => {
        res.send({
          data
        })
      }
    })
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(){
    return "It's my profile"
  }
}
