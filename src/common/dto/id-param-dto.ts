import { IsUUID } from 'class-validator';

export class IdParamDto {
  @IsUUID(4, { message: 'Id is not valid' })
  id: string;
}
