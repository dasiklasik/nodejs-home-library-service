import { IsUUID } from 'class-validator';

export class GetTrackByIdDto {
  @IsUUID(4, { message: 'Track id is not valid' })
  id: string;
}
