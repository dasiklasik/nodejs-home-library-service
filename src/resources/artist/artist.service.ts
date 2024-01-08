import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';

import { Artist } from './artist.model';

import { CreateArtistDto } from './dto/create-artist-dto';
import { UpdateArtistDto } from './dto/update-artist-dto';

import { FavsService } from '../favs/favs.service';
import { AlbumService } from '../album/album.service';

import { IdParamDto } from '../../common/dto/id-param-dto';

@Injectable()
export class ArtistService {
  constructor(
    private favsService: FavsService,
    private albumService: AlbumService,
  ) {}

  private artists: Artist[] = [];

  getArtists() {
    return this.artists;
  }

  getArtistById({ id }: IdParamDto) {
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

  updateArtist({ id }: IdParamDto, body: UpdateArtistDto) {
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

  deleteArtist(params: IdParamDto) {
    const { id } = params;

    const artist = this.artists.find((artistItem) => artistItem.id === id);

    if (!artist) {
      throw new NotFoundException();
    }

    this.artists = this.artists.filter((artistItem) => artistItem.id !== id);

    this.albumService.deleteArtistId(id);

    const isArtistInFavs = this.favsService.getIsArtistInFavs(id);

    if (isArtistInFavs) {
      this.favsService.deleteArtistById(params);
    }

    return artist;
  }
}
