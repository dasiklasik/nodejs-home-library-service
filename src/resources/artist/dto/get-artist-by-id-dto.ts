import { IsUUID } from 'class-validator';

export class GetArtistByIdDto {
  @IsUUID(4, { message: 'Artist id is not valid' })
  id: string;
}
