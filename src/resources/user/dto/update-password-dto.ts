import { IsUUID } from 'class-validator';

export interface UpdatePasswordDto {
  oldPassword: string;
  newPassword: string;
}

export class UpdatePasswordParamsDto {
  @IsUUID(4, { message: 'User id is not valid' })
  id: string;
}
