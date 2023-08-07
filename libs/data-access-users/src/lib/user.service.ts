import { Injectable } from "@nestjs/common";
import { PrismaService } from "@trello-demo/prisma-schema";
import { CreateUserDto } from "@trello-demo/shared";
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) { }

  async createUser(data: CreateUserDto){
    const hashedPassword = await argon2.hash(data.password);

    const user = await this.prismaService.user.create({
      data: {
        email: data.email,
        name: data.name,
        hashedPassword
      }
    })

    return user;
  }
}