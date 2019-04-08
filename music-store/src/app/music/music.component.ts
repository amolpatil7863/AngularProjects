import { Component, OnInit } from '@angular/core';
import { MusicService } from '../music.service';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {

  constructor(private musicService: MusicService) { }
  resultArray:any;
  musicAlbum:[];
  ngOnInit() {
    this.getMusics();
  }

  getMusics() {
    this.musicService.getMusics()
      .subscribe(
        result => {
          this.resultArray=result;
          this.musicAlbum=result;
        
          this.resultArray.forEach(contact => {
            console.log(contact.id);
          });
          console.log("data from server:::" +this.musicAlbum);
        },
        error => {
          console.log(JSON.stringify(error))

        });
  }


//   dataURItoBlob(dataURI) {
//     var binary = atob(dataURI.split(',')[1]);
//     var array = [];
//   for (var i = 0; i < binary.length; i++) {
//      array.push(binary.charCodeAt(i));
//   }
//  return new Blob([new Uint8Array(array)], {
//     type: 'image/jpg'
// });
// }

}
