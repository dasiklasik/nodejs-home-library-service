import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';

import { Album } from './album.model';

import { CreateAlbumDto } from './dto/create-album-dto';
import { UpdateAlbumDto } from './dto/update-album-dto';

import { IdParamDto } from '../../common/dto/id-param-dto';
import { FavsService } from '../favs/favs.service';

@Injectable()
export class AlbumService {
  constructor(private favsService: FavsService) {}

  private albums: Album[] = [];

  getAlbums() {
    return this.albums;
  }

  getAlbumById({ id }: IdParamDto) {
    const album = this.albums.find((albumItem) => albumItem.id === id);

    if (!album) {
      throw new NotFoundException();
    }

    return album;
  }

  createAlbum(params: CreateAlbumDto) {
    const album: Album = {
      id: v4(),
      ...params,
    };

    this.albums.push(album);

    return album;
  }

  updateAlbum({ id }: IdParamDto, body: UpdateAlbumDto) {
    const album = this.albums.find((albumItem) => albumItem.id === id);

    if (!album) {
      throw new NotFoundException();
    }

    const updatedAlbum = { ...album, ...body };

    this.albums = this.albums.map((albumItem) =>
      albumItem.id === id ? updatedAlbum : albumItem,
    );

    return updatedAlbum;
  }

  deleteAlbum(params: IdParamDto) {
    const { id } = params;

    const album = this.albums.find((albumItem) => albumItem.id === id);

    if (!album) {
      throw new NotFoundException();
    }

    this.albums = this.albums.filter((albumItem) => albumItem.id !== id);

    const isAlbumInFavs = this.favsService.getIsAlbumInFavs(id);

    if (isAlbumInFavs) {
      this.favsService.deleteAlbumById(params);
    }

    return album;
  }

  deleteArtistId(id: string) {
    this.albums = this.albums.map((album) =>
      album.artistId === id ? { ...album, artistId: null } : album,
    );
  }
}
