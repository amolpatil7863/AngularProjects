import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements CanActivate {

  constructor(private router: Router, private cookie: CookieService) {

  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('calling Auth gaurd servce');
    const currentUser = this.cookie.get('username');
    const authToken = localStorage.getItem('currentUser');

    if (this.isLoggedIn()) {
      console.log("Authorized User!!!!!!!!!");
      return true;
    } else {
      console.log('Unauthorized User!!!!!!!!!!');
      this.router.navigate(['login']);
      return false;
    }

  }

  isLoggedIn() {
    const currentUser = this.cookie.get('username');
    const authToken = localStorage.getItem('currentUser');
    if (authToken && currentUser) {
      return true;
    }
    return false;
  }
}
