import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MusicService {

  apiUrl: string = "http://localhost:8084/api/v1/music";

  constructor(private httpCient: HttpClient) { 
  }


  getMusics():Observable<any> {
    let token=localStorage.getItem("currentUser");
    token='Bearer'+' '+token;
   
    let header=new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 
     token});
  
    return this.httpCient.get(this.apiUrl,{headers: header});
  }
}
