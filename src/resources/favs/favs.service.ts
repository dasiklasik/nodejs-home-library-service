import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Favorites } from './favs.model';
import { GetFavoritesResponse } from './favs.types';

import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';

import { IdParamDto } from '../../common/dto/id-param-dto';

@Injectable()
export class FavsService {
  constructor(
    private albumService: AlbumService,
    private artistService: ArtistService,
    private trackService: TrackService,
  ) {}

  private favorites: Favorites = { albums: [], artists: [], tracks: [] };

  getFavorites() {
    const response: GetFavoritesResponse = {
      albums: [],
      artists: [],
      tracks: [],
    };

    this.favorites.artists.forEach((id) => {
      const artist = this.artistService.getArtistById({ id });

      response.artists.push(artist);
    });

    this.favorites.albums.forEach((id) => {
      const album = this.albumService.getAlbumById({ id });

      response.albums.push(album);
    });

    this.favorites.tracks.forEach((id) => {
      const track = this.trackService.getTrackById({ id });

      response.tracks.push(track);
    });

    return response;
  }

  addTrackById({ id }: IdParamDto) {
    const track = this.trackService.getTrackById({ id });

    if (!track) {
      throw new HttpException(
        'Track not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isAdded = this.favorites.tracks.includes(id);

    if (isAdded) {
      throw new HttpException(
        'Track is already added to favorites',
        HttpStatus.CREATED,
      );
    }

    this.favorites.tracks.push(id);

    return track;
  }

  deleteTrackById({ id }: IdParamDto) {
    const trackId = this.favorites.tracks.find((track) => track === id);

    if (!trackId) {
      throw new NotFoundException();
    }

    this.favorites.tracks = this.favorites.tracks.filter(
      (track) => track === id,
    );

    return trackId;
  }

  addAlbumById({ id }: IdParamDto) {
    const album = this.albumService.getAlbumById({ id });

    if (!album) {
      throw new HttpException(
        'Album not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isAdded = this.favorites.albums.includes(id);

    if (isAdded) {
      throw new HttpException(
        'Album is already added to favorites',
        HttpStatus.CREATED,
      );
    }

    this.favorites.albums.push(id);

    return album;
  }

  deleteAlbumById({ id }: IdParamDto) {
    const albumId = this.favorites.albums.find((album) => album === id);

    if (!albumId) {
      throw new NotFoundException();
    }

    this.favorites.albums = this.favorites.albums.filter(
      (album) => album === id,
    );

    return albumId;
  }

  addArtistById({ id }: IdParamDto) {
    const artist = this.artistService.getArtistById({ id });

    if (!artist) {
      throw new HttpException(
        'Artist not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isAdded = this.favorites.artists.includes(id);

    if (isAdded) {
      throw new HttpException(
        'Artist is already added to favorites',
        HttpStatus.CREATED,
      );
    }

    this.favorites.artists.push(id);

    return artist;
  }

  deleteArtistById({ id }: IdParamDto) {
    const artistId = this.favorites.artists.find((artist) => artist === id);

    if (!artistId) {
      throw new NotFoundException();
    }

    this.favorites.artists = this.favorites.artists.filter(
      (album) => album === id,
    );

    return artistId;
  }

  getIsArtistInFavs(id: string) {
    return this.favorites.artists.find((artistId) => artistId === id);
  }

  getIsAlbumInFavs(id: string) {
    return this.favorites.albums.find((albumId) => albumId === id);
  }

  getIsTrackInFavs(id: string) {
    return this.favorites.tracks.find((trackId) => trackId === id);
  }
}
