import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl: string = 'http://localhost:8084/api/v1/users/login';

  constructor(private httpClient: HttpClient) {

  }

  login(username: string, password: string) {
    // console.log('calling login service' + username + " " + password);
    return this.httpClient.post(this.apiUrl, { username: username, password: password }, { observe: 'response' });

  }
}
