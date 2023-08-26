import { Injectable } from "@nestjs/common";
import { PrismaService } from "@trello-demo/prisma-schema";
import { CreateUserDto } from "@trello-demo/shared";
import * as argon2 from 'argon2';
import { EditUserDto } from '@trello-demo/shared';
import { RpcException } from '@nestjs/microservices';

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

  async findUniqueByEmail(email: string){
    return await this.prismaService.user.findUnique({
      where: {
        email: email
      }
    })
  }

  async findById(id: string) {
    return await this.prismaService.user.findUnique({
      where: {
        id: id
      }
    })
  }

  async updateById(userId: string, editUserDto: EditUserDto){
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId
      }
    })
    if(!user){
      throw new RpcException('User invalid');
    }

    let isChangePassword: boolean = false;
    if(editUserDto?.currentPassword && editUserDto?.newPassword && editUserDto?.newPasswordConfirm){
      isChangePassword = true;
    }

    let newUser;
    if(isChangePassword){
      const matchesPassword = await argon2.verify(user.hashedPassword, editUserDto.currentPassword);
      if(!matchesPassword) { throw new  RpcException('Current password is wrong. Pleaes try again');}
      if(editUserDto.newPassword != editUserDto.newPasswordConfirm) { throw new RpcException('New password and Password confirm is diff.'); }

      const hashedPassword = await argon2.hash(editUserDto.newPassword);
      newUser = await this.prismaService.user.update({
        where: {
          id: userId
        },
        data: {
          email: editUserDto.email,
          name: editUserDto.name,
          hashedPassword
        }
      })
    } else {
      newUser = await this.prismaService.user.update({
        where: {
          id: userId
        },
        data: {
          email: editUserDto.email,
          name: editUserDto.name
        }
      })
    }

    newUser.hashedPassword = ''

    return newUser;
  }
}
