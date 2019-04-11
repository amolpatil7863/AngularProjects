import { Component, OnInit } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private route: ActivatedRoute, private cookie: CookieService,
    private router: Router) { }
  loginForm: FormGroup;
  loginFailure: boolean = false;
  currentuser:string;

  ngOnInit() {
    this.loginForm = new FormGroup({
      userName: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required)
    });
  }

  login(form: FormGroup) {
    console.log("login" + form.value.userName + "    " + form.value.password);
    this.loginService.login(form.value.userName, form.value.password)
      .subscribe(
        result => {
          // console.log('result' + result);
          var headerData = result.headers.get("headerData");
          var data = headerData.split(',');

          var jwtToken = data[0];
          var role = data[1];

          // console.log("Header data::::" + jwtToken + "roe" + role);
          // login successful if there's a jwt token in the response
          if (result && jwtToken) {
            console.log('login success' + role);
            this.currentuser=form.value.userName;
            this.cookie.set('username', form.value.userName);
            // this.loginSuccess = true;
            this.loginFailure = false;
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', jwtToken);

            if (role.includes('ROLE_ADMIN')) {
              console.log('ADMIN');
              this.router.navigate(['music/admin']);
            } else {
              
              this.router.navigate(['music']);
            }
          } else {
            console.log('login failed');

            this.loginFailure = true;
            this.router.navigate(['login']);
          }

        },
        error => {
          console.log('login failed');

          this.loginFailure = true;
          console.log(JSON.stringify(error))
          this.router.navigate(['login']);
        });
  }



  public currentUserValue(userName:string): string {
    return this.currentuser=userName;
}
}
