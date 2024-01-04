import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';

import { Artist } from './artist.model';

import { GetArtistByIdDto } from './dto/get-artist-by-id-dto';
import { CreateArtistDto } from './dto/create-artist-dto';
import {
  UpdateArtistDto,
  UpdateArtistParamsDto,
} from './dto/update-artist-dto';
import { DeleteArtistDto } from './dto/delete-artist-dto';

@Injectable()
export class ArtistService {
  private artists: Artist[] = [];

  getArtists() {
    return this.artists;
  }

  getArtistById({ id }: GetArtistByIdDto) {
    const artist = this.artists.find((artistItem) => artistItem.id === id);

    if (!artist) {
      throw new NotFoundException();
    }

    return artist;
  }

  createArtist(params: CreateArtistDto) {
    const artist: Artist = {
      id: v4(),
      ...params,
    };

    this.artists.push(artist);

    return artist;
  }

  updateArtist({ id }: UpdateArtistParamsDto, body: UpdateArtistDto) {
    const artist = this.artists.find((artistItem) => artistItem.id === id);

    if (!artist) {
      throw new NotFoundException();
    }

    const updatedArtist = { ...artist, ...body };

    this.artists = this.artists.map((artistItem) =>
      artistItem.id === id ? updatedArtist : artistItem,
    );

    return updatedArtist;
  }

  deleteArtist({ id }: DeleteArtistDto) {
    const artist = this.artists.find((artistItem) => artistItem.id === id);

    if (!artist) {
      throw new NotFoundException();
    }

    this.artists = this.artists.filter((artistItem) => artistItem.id !== id);

    return artist;
  }
}
