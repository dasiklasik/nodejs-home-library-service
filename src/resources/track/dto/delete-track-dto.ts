import { IsUUID } from 'class-validator';

export class DeleteTrackDto {
  @IsUUID(4, { message: 'Track id is not valid' })
  id: string;
}
