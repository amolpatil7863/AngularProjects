import { MusicPlayer } from './MusicPlayer';

export interface MusicAlbum {
    id: number;
    albumImage: string;
    albumName: string;
    music: MusicPlayer[];
   

}