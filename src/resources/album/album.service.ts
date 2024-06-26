import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { v4 } from 'uuid';

import { Album } from './album.model';

import { CreateAlbumDto } from './dto/create-album-dto';
import { UpdateAlbumDto } from './dto/update-album-dto';

import { FavsService } from '../favs/favs.service';

import { IdParamDto } from '../../common/dto/id-param-dto';

@Injectable()
export class AlbumService {
  private albums: Album[] = [];

  constructor(
    @Inject(forwardRef(() => FavsService))
    private readonly favsService: FavsService,
  ) {}

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

  deleteAlbum({ id }: IdParamDto) {
    const album = this.albums.find((albumItem) => albumItem.id === id);

    if (!album) {
      throw new NotFoundException();
    }

    this.albums = this.albums.filter((albumItem) => albumItem.id !== id);

    return album;
  }
}
