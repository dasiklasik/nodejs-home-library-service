import { Module, forwardRef } from '@nestjs/common';

import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';

import { TrackModule } from '../track/track.module';
import { AlbumModule } from '../album/album.module';
import { ArtistModule } from '../artist/artist.module';

@Module({
  controllers: [FavsController],
  providers: [FavsService],
  imports: [
    forwardRef(() => TrackModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => ArtistModule),
  ],
  exports: [FavsService],
})
export class FavsModule {}
