import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import * as jwt_decode from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private router: Router, private cookie: CookieService) {

  }
  role:boolean;
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('calling Admin Auth gaurd');
    const currentUser = this.cookie.get('username');
    const authToken = localStorage.getItem('currentUser');

    let decodedJwtToken = this.getDecodedAccessToken(authToken);
    this.role = decodedJwtToken.scope;
    console.log("decode Token:::" + decodedJwtToken.scope);
  
    if (this.role===true) {
      console.log("Admin user"+this.role);
      return true;
    } else {
      console.log('Normal user'+this.role+"route url::"+this.router.url);
      this.router.navigate(['login']);
      return false;
    }

  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  }
}
