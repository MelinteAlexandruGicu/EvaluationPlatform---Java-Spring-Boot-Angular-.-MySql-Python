import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$" )]);
  hide = true;
  credentials = {
    email: '', 
    password: ''
  }

  constructor() { }

  ngOnInit(): void {
  }

  getErrorEmailMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorPasswordMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return (this.password.hasError('pattern')) ? 'Not a valid password' : '';
  }

  onSubmit() {
    console.log("form is submited")
    if((this.credentials.email != '' && this.credentials.password != '') && (this.credentials.email != null && this.credentials.password != null)) {
      console.log("We have to submit to server!");
    }
    else {
      console.error("Fields are required");
    }
  }

}
