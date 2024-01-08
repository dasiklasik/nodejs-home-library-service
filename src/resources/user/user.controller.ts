import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { UserService } from './user.service';

import { CreateUserDto } from './dto/create-user-dto';
import { UpdatePasswordDto } from './dto/update-password-dto';

import { IdParamDto } from '../../common/dto/id-param-dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUserById(@Param() { id }: IdParamDto) {
    return this.userService.getUserById(id);
  }

  @Post()
  @HttpCode(201)
  createUser(@Body() params: CreateUserDto) {
    return this.userService.createUser(params);
  }

  @Put(':id')
  updatePassword(@Param() params: IdParamDto, @Body() body: UpdatePasswordDto) {
    return this.userService.updatePassword(params, body);
  }

  @Delete(':id')
  deleteUser(@Param() params: IdParamDto) {
    return this.userService.deleteUser(params);
  }
}
