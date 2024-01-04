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

import { GetUserByIdDto } from './dto/get-user-by-id-dto';
import { CreateUserDto } from './dto/create-user-dto';
import { DeleteUserDto } from './dto/delete-user-dto';
import {
  UpdatePasswordDto,
  UpdatePasswordParamsDto,
} from './dto/update-password-dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUserById(@Param() { id }: GetUserByIdDto) {
    return this.userService.getUserById(id);
  }

  @Post()
  @HttpCode(201)
  createUser(@Body() params: CreateUserDto) {
    return this.userService.createUser(params);
  }

  @Put(':id')
  updatePassword(
    @Param() params: UpdatePasswordParamsDto,
    @Body() body: UpdatePasswordDto,
  ) {
    return this.userService.updatePassword(params, body);
  }

  @Delete(':id')
  deleteUser(@Param() params: DeleteUserDto) {
    return this.userService.deleteUser(params);
  }
}
