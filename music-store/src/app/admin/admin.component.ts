import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MusicAlbum } from '../music/MusicAlbum';
import { MusicPlayer } from '../music/MusicPlayer';
import { MusicService } from '../music.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalManager } from 'ngb-modal';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  @ViewChild('myModal') myModal;
  @ViewChild('deleteModel') deleteModel;
  private modalRef;

  albumForm: FormGroup;
  musicAlbumData: MusicAlbum;
  musicPlayerArray: Array<MusicPlayer> = [];
  musicPlayer: MusicPlayer;
  musicAlbumId: string;
  playImg: string = "../assets/images/play.jpeg";

  musicIdDelete: number = 0;

  constructor(private musicService: MusicService, private modalService: ModalManager, private cookie: CookieService,
    private sanitizer: DomSanitizer, private route: ActivatedRoute,
    private router: Router) { }
  resultArray: any;
  musicAlbum: [];
  baseUrl: string = 'data:image/jpeg;base64,';
  base64textString: any;
  base64MusicTextString: string;
  is_edit: boolean = false;
  selectedFile: File;
  userName: string;
  albumImageName: string;
  isDisabled(): boolean {
    return this.is_edit;
  }


  ngOnInit() {
    this.userName = this.cookie.get('username');
    console.log('cookie name' + this.userName);
    this.getMusics();
    this.albumForm = new FormGroup({
      albumName: new FormControl(''),
      albumImage: new FormControl(''),
      musicName: new FormControl(''),
      singerName: new FormControl(''),
      description: new FormControl(''),
      musicFile: new FormControl('')
    });


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

  addAlbum(form: FormGroup) {
    console.log('id::::::::::' + this.musicAlbumId);

    if (typeof this.musicAlbumId === null || typeof this.musicAlbumId === "undefined") {
      console.log('calling musicAlbum api');


      this.musicPlayerArray.push({ id: 1, description: form.value.description, musicName: this.albumForm.value.musicName, singerName: this.albumForm.value.singerName, musicFileName: this.base64MusicTextString });



      this.musicAlbumData = {
        "id": 1,
        "albumImage": this.base64textString,
        "albumName": form.value.albumName,
        "music": this.musicPlayerArray
      };


      this.musicService.addMusicAlbum(this.musicAlbumData)
        .subscribe(
          result => {
            console.log("Music Album Added Successfully");

          },
          error => {
            console.log(JSON.stringify(error))

          });
      this.modalService.close(this.modalRef);
    } else {

      console.log('calling musicplayer api' + this.base64MusicTextString);
      this.musicPlayer = { id: 1, description: form.value.description, musicName: this.albumForm.value.musicName, singerName: this.albumForm.value.singerName, musicFileName: this.base64MusicTextString };


      this.musicService.addMusicPlayer(this.musicPlayer, this.musicAlbumId)
        .subscribe(
          result => {
            console.log("Music Album Added Successfully" + JSON.stringify(result));

          },
          error => {
            console.log(JSON.stringify(error))

          });
      this.modalService.close(this.modalRef);
    }
  }

  deleteMusic() {
    if (this.musicIdDelete === null || this.musicIdDelete === 0) {
      console.log('id is null');
    } else {
      console.log('deleting id');
      this.musicService.deleteMusicPlayer(this.musicIdDelete)
        .subscribe(
          result => {
            console.log('deleted music');
            this.modalService.close(this.modalRef);

          },
          error => {
            console.log(JSON.stringify(error))

          });
    }

  }
  openDeleteModal(id: number) {
    console.log('id to be deleted:::::' + id);
    this.musicIdDelete = id;
    this.modalRef = this.modalService.open(this.deleteModel,
      {
        size: "sm",
        modalClass: 'deleteModel',
        hideCloseButton: false,
        centered: true,
        backdrop: true,
        animation: true,
        keyboard: false,
        closeOnOutsideClick: true,
        backdropClass: "modal-backdrop"
      })
  }


  openPopup() {
    this.modalRef = this.modalService.open(this.myModal,
      {
        size: "md",
        modalClass: 'mymodal',
        hideCloseButton: false,
        centered: false,
        backdrop: true,
        animation: true,
        keyboard: false,
        closeOnOutsideClick: true,
        backdropClass: "modal-backdrop"
      })
  }
  closeModal() {
    this.modalService.close(this.modalRef);

  }




  onUploadChange(event) {
    var files = event.target.files;
    var file = files[0];

    if (files && file) {

      var reader = new FileReader();

      reader.onload = this.handleFile.bind(this);

      reader.readAsBinaryString(file);
    }

  }




  handleFile(event) {
    var binaryString = event.target.result;
    this.base64textString = btoa(binaryString);
    // console.log("Encoded String::::" + btoa(binaryString));
    return this.base64textString;
  }

  addMusicPlayer(event: any) {
    this.musicAlbumId = event.target.value;
    if (this.musicAlbumId === null || this.musicAlbumId === 'undefined' || this.musicAlbumId === '0') {
      this.is_edit = false;
    }
    else {
      this.is_edit = true;
    }
  }

  playMusic(musicFile: string) {
    let audio = new Audio();
    audio.src = musicFile;

    audio.load();
    audio.play();
  }


  selectMusicFile(files: FileList) {
    let file = files.item(0);
    var fileReader = new FileReader();



    fileReader.onload = this._handleReaderLoaded.bind(this);

    fileReader.readAsBinaryString(file);

  }
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64MusicTextString = btoa(binaryString);
    //  console.log('base 64 ::::'+this.base64MusicTextString);
  }



  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
    this.cookie.delete('username');
    console.log('destroyed user and usercookie');
  }


}
