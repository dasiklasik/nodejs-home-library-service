import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 } from 'uuid';

import { User } from './user.model';

import { CreateUserDto } from './dto/create-user-dto';
import { DeleteUserDto } from './dto/delete-user-dto';
import {
  UpdatePasswordDto,
  UpdatePasswordParamsDto,
} from './dto/update-password-dto';

@Injectable()
export class UserService {
  private users: User[] = [];

  getUsers(): User[] {
    return this.users;
  }

  getUserById(id: string) {
    const user = this.users.find((item) => item.id === id);

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    return user;
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

    return user;
  }

  updatePassword(
    { id }: UpdatePasswordParamsDto,
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

    return updatedUser;
  }

  deleteUser({ id }: DeleteUserDto) {
    const user = this.users.find((userItem) => userItem.id === id);

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    this.users = this.users.filter((userItem) => userItem.id !== id);

    return user;
  }
}
