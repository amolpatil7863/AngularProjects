import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Users } from '../login/users';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private registerService: RegisterService) { }
  registerationForm: FormGroup;
  userData: Users;

  ngOnInit() {
    this.registerationForm = new FormGroup({
      username: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      password: new FormControl(''),
      email: new FormControl('')
    });
  }

  register(form: FormGroup) {

    this.userData = form.value;
    console.log('data'+JSON.stringify(this.userData));
    this.registerService.register(this.userData)
      .subscribe(
        result => {
          console.log("After login::::" + JSON.stringify(result));

        },
        error => {
          console.log(JSON.stringify(error))

        });

  }

}
