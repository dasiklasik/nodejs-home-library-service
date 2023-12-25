import { IsUUID } from 'class-validator';

export class UpdateArtistDto {
  name?: string;
  grammy?: boolean;
}

export class UpdateArtistParamsDto {
  @IsUUID(4, { message: 'Artist id is not valid' })
  id: string;
}
