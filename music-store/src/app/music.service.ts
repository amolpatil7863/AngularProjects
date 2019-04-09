import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MusicAlbum } from './music/MusicAlbum';
import { MusicPlayer } from './music/MusicPlayer';


@Injectable({
  providedIn: 'root'
})
export class MusicService {

  apiUrl: string = "http://localhost:8084/api/v1/music";
  musicAlbum: MusicAlbum;
  constructor(private httpCient: HttpClient) {
  }


  getMusics(): Observable<any> {
    return this.httpCient.get(this.apiUrl, { headers: this.getTokenFromStorage() });
  }

  addMusicAlbum(data: MusicAlbum) {
    console.log("saving object:::" + JSON.stringify(data));
    return this.httpCient.post(this.apiUrl, data, { headers: this.getTokenFromStorage() });
  }


  addMusicPlayer(data: MusicPlayer, id: string) {
    return this.httpCient.post(this.apiUrl + '/musicplayer/' + id, data, { headers: this.getTokenFromStorage() });

  }


  getTokenFromStorage() {
    let token = localStorage.getItem("currentUser");
    token = 'Bearer' + ' ' + token;

    let header = new HttpHeaders({
      'Content-Type': 'application/json', 'Authorization':
        token
    });
    return header;
  }
}

