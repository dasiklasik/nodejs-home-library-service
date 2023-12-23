import { IsUUID } from 'class-validator';

export class DeleteUserDto {
  @IsUUID(4, { message: 'User id is invalid' })
  id: string;
}
