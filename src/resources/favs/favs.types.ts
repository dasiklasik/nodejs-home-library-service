import { Artist } from '../artist/artist.model';
import { Album } from '../album/album.model';
import { Track } from '../track/track.model';

export interface GetFavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
