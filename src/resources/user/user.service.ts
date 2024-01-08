import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 } from 'uuid';

import { User } from './user.model';

import { CreateUserDto } from './dto/create-user-dto';
import { UpdatePasswordDto } from './dto/update-password-dto';

import { securityUtils } from '../../utils';

import { IdParamDto } from '../../common/dto/id-param-dto';

@Injectable()
export class UserService {
  private users: User[] = [];

  getUsers() {
    return this.users.map(securityUtils.getPublicUserData);
  }

  getUserById(id: string) {
    const user = this.users.find((item) => item.id === id);

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    return securityUtils.getPublicUserData(user);
  }

  createUser({ login, password }: CreateUserDto) {
    const user: User = {
      id: v4(),
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.users.push(user);

    return securityUtils.getPublicUserData(user);
  }

  updatePassword(
    { id }: IdParamDto,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ) {
    const user = this.users.find((item) => item.id === id);

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    if (user.password !== oldPassword) {
      throw new HttpException('Wrong old password', HttpStatus.FORBIDDEN);
    }

    const updatedUser = { ...user, password: newPassword };

    this.users = this.users.map((userItem) =>
      userItem.id === user.id ? updatedUser : userItem,
    );

    return securityUtils.getPublicUserData(updatedUser);
  }

  deleteUser({ id }: IdParamDto) {
    const user = this.users.find((userItem) => userItem.id === id);

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    this.users = this.users.filter((userItem) => userItem.id !== id);

    return securityUtils.getPublicUserData(user);
  }
}
