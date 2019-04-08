import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from './login/users';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  apiUrl: string = 'http://localhost:8084/api/v1/users/signup';

  constructor(private httpClient:HttpClient) { }

  register(user:Users){
    return this.httpClient.post(this.apiUrl,user);
  }
}
