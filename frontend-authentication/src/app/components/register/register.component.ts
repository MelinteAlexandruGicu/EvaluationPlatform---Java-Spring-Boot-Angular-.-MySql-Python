import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { matchValidator } from 'src/app/functions/form-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  email = new FormControl('', 
  [
    Validators.required,
    Validators.email
  ]);
  username = new FormControl('', 
  [
    Validators.required, 
    Validators.pattern("[a-zA-Z]+")
  ]);
  password = new FormControl('', 
    [
      Validators.required, 
      Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"),
      matchValidator('confirmPassword', true)
    ]);
  confirmPassword = new FormControl('', 
  [
    Validators.required, 
    Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"),
    matchValidator('password')
  ]);
  hide = true;
  credentials = {
    email: '', 
    username: '',
    password: '', 
    confirmPassword: ''
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

  getErrorUsernameMessage() {
    if (this.username.hasError('required')) {
      return 'You must enter a value';
    }

    return this.username.hasError('pattern') ? 'Not a valid username' : '';
  }

  getErrorPasswordMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return (this.password.hasError('pattern')) ? 'Not a valid password' : '';
  }

  // getErrorPasswordsNotMatch() {
  //   if (this.confirmPassword.hasError('required')) {
  //     return 'You must enter a value';
  //   }

  //   if(this.confirmPassword.hasError('pattern')) {
  //     return 'Not a valid password'; 
  //   }

  //   return (this.confirmPassword.value !== this.password.value) ? 'Passwords should be the same!' : 'Ana are mere';
  // }

  onRegister() {
    console.log("Register was sent!")
    if((this.credentials.email != '' && this.credentials.password != '') && (this.credentials.email != null && this.credentials.password != null)) {
      console.log("We have to submit to server!");
    }
    else {
      console.error("Fields are required");
    }
  }
}
