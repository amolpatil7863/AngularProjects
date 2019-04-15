import { Component, OnInit, ViewChild } from '@angular/core';
import { MusicService } from '../music.service';
import { ModalManager } from 'ngb-modal';
import { FormGroup, FormControl } from '@angular/forms';
import { MusicAlbum } from './MusicAlbum';
import { MusicPlayer } from './MusicPlayer';
import { DomSanitizer } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { jsonpCallbackContext } from '@angular/common/http/src/module';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {

  currentTime: Date = new Date();
  albumForm: FormGroup;
  playImg: string = "../assets/images/play.jpeg";
  paused: boolean = true;
  audio = new Audio();
  resultArray: any;
  musicAlbum: [];
  userName: string;


  constructor(private musicService: MusicService, private modalService: ModalManager, private cookie: CookieService,
    private sanitizer: DomSanitizer, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.userName = this.cookie.get('username');
    console.log('cookie name' + this.userName);
    this.getMusics();

  }

  getMusics() {
    this.musicService.getMusics()
      .subscribe(
        result => {
          this.resultArray = result;
          this.musicAlbum = result;
        },
        error => {
          console.log(JSON.stringify(error));

        });

  }

  playMusic(albumName: string, singerName: string, albumImage: string, musicFileName: string, musicName: string) {

    // console.log('music data:::'+JSON.stringify(this.musicAlbum));
    // console.log('image file:::' + musicName);
    this.router.navigate(['/music/song-info'], { queryParams: { albumName: albumName, singerName: singerName, image: albumImage, musicFileName: musicFileName, musicName: musicName } });
  }



  logout() {
    console.log('destroying user');
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }

}
