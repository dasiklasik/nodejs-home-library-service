import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';

import { Track } from './track.model';

import { GetTrackByIdDto } from './dto/get-track-by-id-dto';
import { CreateTrackDto } from './dto/create-track-dto';
import { UpdateTrackDto, UpdateTrackParamsDto } from './dto/update-track-dto';
import { DeleteTrackDto } from './dto/delete-track-dto';

@Injectable()
export class TrackService {
  private tracks: Track[] = [];

  getTracks() {
    return this.tracks;
  }

  getTrackById({ id }: GetTrackByIdDto) {
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

  updateTrack({ id }: UpdateTrackParamsDto, body: UpdateTrackDto) {
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

  deleteTrack({ id }: DeleteTrackDto) {
    const track = this.tracks.find((trackItem) => trackItem.id === id);

    if (!track) {
      throw new NotFoundException();
    }

    this.tracks = this.tracks.filter((trackItem) => trackItem.id !== id);

    return track;
  }
}
