import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  year: number;

  artistId: string | null;
}
