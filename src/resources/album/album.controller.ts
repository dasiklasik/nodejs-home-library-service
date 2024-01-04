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

import { GetAlbumByIdDto } from './dto/get-album-by-id-dto';
import { CreateAlbumDto } from './dto/create-album-dto';
import { UpdateAlbumDto, UpdateAlbumParamsDto } from './dto/update-album-dto';
import { DeleteAlbumDto } from './dto/delete-album-dto';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  getAlbums() {
    return this.albumService.getAlbums();
  }

  @Get(':id')
  getAlbumById(@Param() params: GetAlbumByIdDto) {
    return this.albumService.getAlbumById(params);
  }

  @Post()
  @HttpCode(201)
  createAlbum(@Body() params: CreateAlbumDto) {
    return this.albumService.createAlbum(params);
  }

  @Put(':id')
  updateAlbum(
    @Param() params: UpdateAlbumParamsDto,
    @Body() body: UpdateAlbumDto,
  ) {
    return this.albumService.updateAlbum(params, body);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteAlbum(@Param() params: DeleteAlbumDto) {
    return this.albumService.deleteAlbum(params);
  }
}
