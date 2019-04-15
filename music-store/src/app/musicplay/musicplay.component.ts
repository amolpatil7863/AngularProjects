import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-musicplay',
  templateUrl: './musicplay.component.html',
  styleUrls: ['./musicplay.component.scss']
})
export class MusicplayComponent implements OnInit {

  constructor(private cookie: CookieService, private activatedroute: ActivatedRoute,
    private router: Router, private sanitizer: DomSanitizer) { }

  userName: string;
  albumName: string;
  albumImage: string;
  singerName: string;
  musicName: string;
  musicFileName: string;
  audio = new Audio();
  image: any;
  playImg: string = "../assets/images/play.jpeg";
  pauseSong: string = "../assets/images/pauseSong.jpeg";
  isPlay: boolean = false;
  ngOnInit() {
    this.userName = this.cookie.get('username');
    this.activatedroute.queryParams.subscribe(params => {
      this.albumName = params['albumName'];
      this.albumImage = params['image'];
      this.singerName = params['singerName'];
      this.musicFileName = params['musicFileName'];
      this.musicName=params['musicName'];




    });
  }


  playSong() {
    this.isPlay = true;
    this.audio.src = this.musicFileName;
    this.audio.load();
    this.audio.play();
    console.log("duration::::"+this.audio.duration);
  }
  logout() {
    console.log('destroying user');
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }

}
