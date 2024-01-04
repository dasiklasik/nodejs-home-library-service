import { Module } from '@nestjs/common';

import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';

import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';

@Module({
  controllers: [FavsController],
  providers: [FavsService, ArtistService, TrackService, AlbumService],
})
export class FavsModule {}
