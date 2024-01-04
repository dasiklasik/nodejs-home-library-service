import { IsUUID } from 'class-validator';

export class GetUserByIdDto {
  @IsUUID(4, { message: 'User id is invalid' })
  id: string;
}
