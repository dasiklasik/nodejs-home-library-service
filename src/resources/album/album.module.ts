import { Module } from '@nestjs/common';

import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

import { FavsService } from '../favs/favs.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, FavsService],
})
export class AlbumModule {}
