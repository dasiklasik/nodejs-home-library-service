import { Module } from '@nestjs/common';

import { TrackController } from './track.controller';
import { TrackService } from './track.service';

import { FavsService } from '../favs/favs.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService, FavsService],
})
export class TrackModule {}
