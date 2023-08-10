import { BadGatewayException, BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { RpcException } from "@nestjs/microservices";
import { UserService } from '@trello-demo/data-access-users';
import { CreateUserDto, AuthDto } from "@trello-demo/shared";
import * as argon2 from 'argon2';

@Injectable()
export class AppService {
  constructor(private userService: UserService, private jwtService: JwtService, private configService: ConfigService){}

  async signUp(createUserDto: CreateUserDto){
    try {
      const newUser = await this.userService.createUser(createUserDto);
      const token = await this.signToken(newUser.id, newUser.email);

      return token;
    } catch(err) {
      throw new RpcException(new BadRequestException('Invalid credentials'))
    }
  }

  async signIn(authDto: AuthDto) {
    const user = await this.userService.findUniqueByEmail(authDto.email);
    if(!user){
      throw new RpcException(new BadGatewayException('Credentials incorrect'));
    }

    const pwMatches = await argon2.verify(user.hashedPassword, authDto.password);
    if(!pwMatches){
      throw new RpcException(new BadGatewayException('Credentials incorrect'))
    }
    const token = await this.signToken(user.id, user.email);

    return token;
  }

  async signToken(userId: string, email: string): Promise<{access_token: string}>{
    const payload = {
      sub: userId,
      email
    }

    const token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET')
    })

    return {
      access_token: token
    }
  }
}
