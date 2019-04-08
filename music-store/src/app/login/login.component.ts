import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService , private route: ActivatedRoute,
    private router: Router) { }
  loginForm: FormGroup;

  ngOnInit() {
    this.loginForm = new FormGroup({
      userName: new FormControl(''),
      password: new FormControl('')
    });
  }

  login(form: FormGroup) {
    console.log("login" + form.value.userName + "    " + form.value.password);
    this.loginService.login(form.value.userName, form.value.password)
      .subscribe(
        result => {
          
          var headerData = result.headers.get("headerData");
                var data = headerData.split(',');

                var jwtToken = data[0];
                var role = data[1];

                console.log("Header data::::" + jwtToken + "roe" + role);
                // login successful if there's a jwt token in the response
                if (result && jwtToken) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', jwtToken);
                    this.router.navigate(['music']);
                    
                    // console.log(JSON.parse(localStorage.getItem('currentUser')));
                }else{
                    this.router.navigate(['login']);
                }

        },
        error => {
          console.log(JSON.stringify(error))
          this.router.navigate(['login']);
        });
  }
}
