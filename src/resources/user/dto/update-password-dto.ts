import { IsUUID } from 'class-validator';

export interface UpdatePasswordDto {
  oldPassword: string;
  newPassword: string;
}
