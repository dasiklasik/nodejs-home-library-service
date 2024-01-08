import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { AlbumService } from './album.service';

import { CreateAlbumDto } from './dto/create-album-dto';
import { UpdateAlbumDto } from './dto/update-album-dto';

import { IdParamDto } from '../../common/dto/id-param-dto';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  getAlbums() {
    return this.albumService.getAlbums();
  }

  @Get(':id')
  getAlbumById(@Param() params: IdParamDto) {
    return this.albumService.getAlbumById(params);
  }

  @Post()
  @HttpCode(201)
  createAlbum(@Body() params: CreateAlbumDto) {
    return this.albumService.createAlbum(params);
  }

  @Put(':id')
  updateAlbum(@Param() params: IdParamDto, @Body() body: UpdateAlbumDto) {
    return this.albumService.updateAlbum(params, body);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteAlbum(@Param() params: IdParamDto) {
    return this.albumService.deleteAlbum(params);
  }
}
