import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';

import { Album } from './album.model';

import { GetAlbumByIdDto } from './dto/get-album-by-id-dto';
import { CreateAlbumDto } from './dto/create-album-dto';
import { UpdateAlbumDto, UpdateAlbumParamsDto } from './dto/update-album-dto';
import { DeleteAlbumDto } from './dto/delete-album-dto';

@Injectable()
export class AlbumService {
  private albums: Album[] = [];

  getAlbums() {
    return this.albums;
  }

  getAlbumById({ id }: GetAlbumByIdDto) {
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

  updateAlbum({ id }: UpdateAlbumParamsDto, body: UpdateAlbumDto) {
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

  deleteAlbum({ id }: DeleteAlbumDto) {
    const album = this.albums.find((albumItem) => albumItem.id === id);

    if (!album) {
      throw new NotFoundException();
    }

    this.albums = this.albums.filter((albumItem) => albumItem.id !== id);

    return album;
  }
}
