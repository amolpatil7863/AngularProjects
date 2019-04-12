import { Component, OnInit, ViewChild } from '@angular/core';
import { MusicService } from '../music.service';
import { ModalManager } from 'ngb-modal';
import { FormGroup, FormControl } from '@angular/forms';
import { MusicAlbum } from './MusicAlbum';
import { MusicPlayer } from './MusicPlayer';
import { DomSanitizer } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';

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


  private __audio: any = null;
  private __playing = false;

  private __trackIndex = 0;

  constructor(private musicService: MusicService, private modalService: ModalManager, private cookie: CookieService,
    private sanitizer: DomSanitizer, private route: ActivatedRoute,
    private router: Router) { }
  resultArray: any;
  musicAlbum: [];

  userName: string;




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

  playMusic(musicFile: string) {

    this.audio.src = musicFile;
 
    console.log('status:::::' + this.audio.paused)
    if (this.audio.paused) {
      console.log('not playing will play');
      this.audio.load();
      this.audio.play();
    } else {
      console.log('playinh')
      this.audio.pause();
      
    }
  }

  // playTrack(musicFile: string) {
  //   console.log('playing' + musicFile);
  //   this.__audio = new Audio();
  //   this.__audio.src = musicFile;
  //   this.__audio.play();
  //   this.__playing = true;
  // }
  // pauseTrack(musicFile: string) {
  //   this.__audio = new Audio();
  //   this.__audio.src = musicFile;
  //   this.__audio.pause();
  //   this.__playing = false;
  // }
  // __stopTrack(musicFile: string) {
  //   this.__audio.pause();
  //   this.__playing = false;
  //   this.__audio.currentTime = 0;
  // }


  logout() {
    console.log('destroying user');
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }

}
