import { IsUUID } from 'class-validator';

export class UpdateAlbumDto {
  name?: string;
  year?: number;
  artistId?: string | null;
}

export class UpdateAlbumParamsDto {
  @IsUUID(4, { message: 'Album id is not valid' })
  id: string;
}
