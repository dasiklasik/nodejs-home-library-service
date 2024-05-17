import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { v4 } from 'uuid';

import { Track } from './track.model';

import { CreateTrackDto } from './dto/create-track-dto';
import { UpdateTrackDto } from './dto/update-track-dto';

import { IdParamDto } from '../../common/dto/id-param-dto';
import { FavsService } from '../favs/favs.service';

@Injectable()
export class TrackService {
  private tracks: Track[] = [];

  constructor(
    @Inject(forwardRef(() => FavsService))
    private readonly favsService: FavsService,
  ) {}

  getTracks() {
    return this.tracks;
  }

  getTrackById({ id }: IdParamDto) {
    const track = this.tracks.find((trackItem) => trackItem.id === id);

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return track;
  }

  createTrack(params: CreateTrackDto) {
    const track: Track = {
      id: v4(),
      ...params,
    };

    this.tracks.push(track);

    return track;
  }

  updateTrack({ id }: IdParamDto, body: UpdateTrackDto) {
    const track = this.tracks.find((trackItem) => trackItem.id === id);

    if (!track) {
      throw new NotFoundException();
    }

    const updatedTrack = { ...track, ...body };

    this.tracks = this.tracks.map((trackItem) =>
      trackItem.id === id ? updatedTrack : trackItem,
    );

    return updatedTrack;
  }

  deleteTrack({ id }: IdParamDto) {
    const track = this.tracks.find((trackItem) => trackItem.id === id);

    if (!track) {
      throw new NotFoundException();
    }

    this.tracks = this.tracks.filter((trackItem) => trackItem.id !== id);

    return track;
  }
}
