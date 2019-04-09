import { Component, OnInit, ViewChild } from '@angular/core';
import { MusicService } from '../music.service';
import { ModalManager } from 'ngb-modal';
import { FormGroup, FormControl } from '@angular/forms';
import { MusicAlbum } from './MusicAlbum';
import { MusicPlayer } from './MusicPlayer';


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


  constructor(private musicService: MusicService, private modalService: ModalManager) { }
  resultArray: any;
  musicAlbum: [];
  baseUrl: string = 'data:image/jpegz;base64,';
  base64textString: any;
  is_edit: boolean = false;


  isDisabled(): boolean {
    return this.is_edit;
  }


  ngOnInit() {
    this.getMusics();
    this.playAudio();
    this.albumForm = new FormGroup({
      albumName: new FormControl(''),
      albumImage: new FormControl(''),
      musicName: new FormControl(''),
      singerName: new FormControl(''),
      description: new FormControl('')
    });
  }

  getMusics() {
    this.musicService.getMusics()
      .subscribe(
        result => {
          this.resultArray = result;
          this.musicAlbum = result;


          this.resultArray.forEach(element => {
            element.albumImage = this.baseUrl.concat(element.albumImage);
            console.log(element.music)
          });

        },
        error => {
          console.log(JSON.stringify(error));

        });

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

  addAlbum(form: FormGroup) {
    console.log('id::::::::::' + this.musicAlbumId);

    if (this.musicAlbumId === null || this.musicAlbumId === 'undefined') {
      console.log('calling musicAlbum api');
      this.musicPlayerArray.push({ id: 1, description: form.value.description, musicName: this.albumForm.value.musicName, singerName: this.albumForm.value.singerName });

      // console.log('musicPlayer data :::' + JSON.stringify(this.musicPlayer));

      this.musicAlbumData = {
        id: 1,
        albumImage: this.base64textString,
        albumName: form.value.albumName,
        music: this.musicPlayerArray,
      };

      // console.log('data' + JSON.stringify(this.musicAlbumData));
      this.musicService.addMusicAlbum(this.musicAlbumData)
        .subscribe(
          result => {
            console.log("Music Album Added Successfully" + JSON.stringify(result));

          },
          error => {
            console.log(JSON.stringify(error))

          });
      this.modalService.close(this.modalRef);
    } else {
      console.log('calling musicplayer api');
      this.musicPlayer = { id: 1, description: form.value.description, musicName: this.albumForm.value.musicName, singerName: this.albumForm.value.singerName };

      console.log("musicPlayer:::" + JSON.stringify(this.musicPlayer));

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

    // console.log(this.musicAlbumId);


  }

  playAudio() {
    let audio = new Audio();
    audio.src = "../../../assets/audio/alarm.wav";
   
    audio.load();
    audio.play();
  }
  
}
