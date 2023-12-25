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

import { TrackService } from './track.service';

import { GetTrackByIdDto } from './dto/get-track-by-id-dto';
import { CreateTrackDto } from './dto/create-track-dto';
import { UpdateTrackDto, UpdateTrackParamsDto } from './dto/update-track-dto';
import { DeleteTrackDto } from './dto/delete-track-dto';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  getTracks() {
    return this.trackService.getTracks();
  }

  @Get(':id')
  getTrackById(@Param() params: GetTrackByIdDto) {
    return this.trackService.getTrackById(params);
  }

  @Post()
  @HttpCode(201)
  createTrack(@Body() params: CreateTrackDto) {
    return this.trackService.createTrack(params);
  }

  @Put(':id')
  updateTrack(
    @Param() params: UpdateTrackParamsDto,
    @Body() body: UpdateTrackDto,
  ) {
    return this.trackService.updateTrack(params, body);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTrack(@Param() params: DeleteTrackDto) {
    return this.trackService.deleteTrack(params);
  }
}
