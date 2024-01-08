import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';

import { FavsService } from './favs.service';

import { IdParamDto } from '../../common/dto/id-param-dto';

@Controller('favs')
export class FavsController {
  constructor(private favsService: FavsService) {}

  @Get()
  getFavorites() {
    return this.favsService.getFavorites();
  }

  @Post('track/:id')
  addTrackById(@Param() params: IdParamDto) {
    return this.favsService.addTrackById(params);
  }

  @Delete('track/:id')
  @HttpCode(204)
  deleteTrackById(@Param() params: IdParamDto) {
    return this.favsService.deleteTrackById(params);
  }

  @Post('album/:id')
  addAlbumById(@Param() params: IdParamDto) {
    return this.favsService.addAlbumById(params);
  }

  @Delete('album/:id')
  @HttpCode(204)
  deleteAlbumById(@Param() params: IdParamDto) {
    return this.favsService.deleteAlbumById(params);
  }

  @Post('artist/:id')
  addArtistById(@Param() params: IdParamDto) {
    return this.favsService.addArtistById(params);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  deleteArtistById(@Param() params: IdParamDto) {
    return this.favsService.deleteArtistById(params);
  }
}
