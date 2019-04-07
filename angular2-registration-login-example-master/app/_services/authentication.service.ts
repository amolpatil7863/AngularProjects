import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'




@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post('http://localhost:8084/api/users/login',
         {username: username, password: password},{observe: 'response'})
            .map(user => {
            var headerData=user.headers.get("headerData");
            var data=headerData.split(',');

            var jwtToken=data[0];
            var role=data[1];
         
console.log("Header data::::"+jwtToken+"roe"+role);
                // login successful if there's a jwt token in the response
                if (user && jwtToken) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser',JSON.stringify(jwtToken));
                } 
                

                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}