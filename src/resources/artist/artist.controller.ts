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

import { GetArtistByIdDto } from './dto/get-artist-by-id-dto';
import { CreateArtistDto } from './dto/create-artist-dto';
import {
  UpdateArtistDto,
  UpdateArtistParamsDto,
} from './dto/update-artist-dto';
import { DeleteArtistDto } from "./dto/delete-artist-dto";

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  getArtists() {
    return this.artistService.getArtists();
  }

  @Get(':id')
  getArtistById(@Param() params: GetArtistByIdDto) {
    return this.artistService.getArtistById(params);
  }

  @Post()
  @HttpCode(201)
  createArtist(@Body() params: CreateArtistDto) {
    return this.artistService.createArtist(params);
  }

  @Put(':id')
  updateArtist(
    @Param() params: UpdateArtistParamsDto,
    @Body() body: UpdateArtistDto,
  ) {
    return this.artistService.updateArtist(params, body);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param() params: DeleteArtistDto) {
    return this.artistService.deleteArtist(params);
  }
}
