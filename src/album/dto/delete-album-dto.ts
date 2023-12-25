import { IsUUID } from 'class-validator';

export class DeleteAlbumDto {
  @IsUUID(4, { message: 'Album id is not valid' })
  id: string;
}
