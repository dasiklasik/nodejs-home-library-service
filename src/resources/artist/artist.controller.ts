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

import { ArtistService } from './artist.service';

import { CreateArtistDto } from './dto/create-artist-dto';
import { UpdateArtistDto } from './dto/update-artist-dto';

import { IdParamDto } from '../../common/dto/id-param-dto';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  getArtists() {
    return this.artistService.getArtists();
  }

  @Get(':id')
  getArtistById(@Param() params: IdParamDto) {
    return this.artistService.getArtistById(params);
  }

  @Post()
  @HttpCode(201)
  createArtist(@Body() params: CreateArtistDto) {
    return this.artistService.createArtist(params);
  }

  @Put(':id')
  updateArtist(@Param() params: IdParamDto, @Body() body: UpdateArtistDto) {
    return this.artistService.updateArtist(params, body);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param() params: IdParamDto) {
    return this.artistService.deleteArtist(params);
  }
}
