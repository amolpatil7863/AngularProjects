import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Users } from '../login/users';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private registerService: RegisterService, private router: Router) { }
  registerationForm: FormGroup;
  userData: Users;
  registerFailure: boolean = false;
  passwordAndConfPassword:boolean=false;


  ngOnInit() {
    this.registerationForm = new FormGroup({
      username: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      password: new FormControl(''),
      email: new FormControl(''),
      confPassword: new FormControl('')
    });
  }

  register(form: FormGroup) {

    console.log('current password:::' + form.value.password + 'confirm password:::' + form.value.confPassword);

    if (form.value.password !== form.value.confPassword) {
      this.passwordAndConfPassword=true;
      return false;
    }

    this.userData = form.value;
    console.log('data' + JSON.stringify(this.userData));
    this.registerService.register(this.userData)
      .subscribe(
        result => {
          console.log("After login::::" + JSON.stringify(result));
          this.router.navigate(['login']);

        },
        error => {
          this.registerFailure = true;
          console.log(JSON.stringify(error))
          this.router.navigate(['rgister']);
        });

  }

  validateRegisterForm() {
    if (this.registerationForm.invalid) {
      this.registerationForm.get('firstName').markAsTouched();
      this.registerationForm.get('lastName').markAsTouched();
      this.registerationForm.get('email').markAsTouched();
      this.registerationForm.get('username').markAsTouched();
      this.registerationForm.get('password').markAsTouched();
      // if(this.regi)
      return false
    }
    return true;
  }

}
