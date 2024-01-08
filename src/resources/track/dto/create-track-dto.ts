import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  name: string;

  artistId: string | null;
  albumId: string | null;

  @IsNumber({ allowNaN: false, allowInfinity: false })
  duration: number;
}
