import { Body, Controller, Get, Post, Res, UseGuards, Request } from '@nestjs/common';
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
    (await this.authService.signUp(createUserDto)).subscribe({
      next: (user: User) => {
        res.send({
          data: user
        })
      },
      error: (err) => {
        res.status(400).send(err.response)
      }
    })
  }

  @Post('sign-in')
  async SignIn(@Body() authDto: AuthDto, @Res() res: Response) {
    (await this.authService.signIn(authDto)).subscribe({
      next: (data) => {
        res.send({
          data
        })
      },
      error: (err) => {
        res.status(400).send(err.response)
      }
    })
  }
}
