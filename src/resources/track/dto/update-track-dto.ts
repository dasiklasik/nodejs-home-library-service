import { IsUUID } from 'class-validator';

export class UpdateTrackDto {
  name?: string;
  artistId?: string | null;
  albumId?: string | null;
  duration?: number;
}

export class UpdateTrackParamsDto {
  @IsUUID(4, { message: 'Track id is not valid' })
  id: string;
}
