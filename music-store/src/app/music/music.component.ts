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
  @ViewChild('myModal') myModal;
  private modalRef;

  albumForm: FormGroup;

  musicAlbumData: MusicAlbum;
  musicPlayerArray: Array<MusicPlayer> = [];
  musicPlayer: MusicPlayer;
  musicAlbumId: string;
  playImg: string = "../assets/images/play.jpeg";

  constructor(private musicService: MusicService, private modalService: ModalManager, private cookie: CookieService,
    private sanitizer: DomSanitizer, private route: ActivatedRoute,
    private router: Router) { }
  resultArray: any;
  musicAlbum: [];
  baseUrl: string = 'data:image/jpeg;base64,';
  base64textString: any;
  is_edit: boolean = false;
  selectedFiles: File;
  currentFileUpload: File;
  userName: string;

  isDisabled(): boolean {
    return this.is_edit;
  }


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


          this.resultArray.forEach(element => {
            element.albumImage = this.baseUrl.concat(element.albumImage);

            element.albumImage = this.sanitizer.bypassSecurityTrustStyle(element.albumImage);
          });

        },
        error => {
          console.log(JSON.stringify(error));

        });

  }





  playMusic(musicFile: string) {
    console.log("Music File:::" + musicFile);

    // let audio = new Audio("data:audio/mp3;base64," + base64strin);
    let audio = new Audio();
    audio.src = musicFile;

    audio.load();
    audio.play();
  }


  logout() {

    console.log('destroying user');
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }

}
