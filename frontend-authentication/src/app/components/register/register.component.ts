import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { matchValidator } from 'src/app/functions/form-validators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  // form: FormGroup;
  form: any = {
    username: null,
    email: null,
    password: null,
    confirmPassword: null
  }
  // form = new FormGroup({
  //   email: new FormControl(
  //     [
  //       '',
  //       Validators.required,
  //       Validators.email
  //     ]
  //   ),
  //   username: new FormControl(
  //     [
  //       '',
  //       Validators.required, 
  //       Validators.pattern("[a-zA-Z0-9]+")
  //     ]
  //   ),
  //   password: new FormControl(
  //     [
  //       '',
  //       Validators.required, 
  //       Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"),
  //       matchValidator('confirmPassword', true)
  //     ]
  //   ),
  //   confirmPassword: new FormControl(
  //     [
  //       '',
  //       Validators.required, 
  //       Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"),
  //       matchValidator('password')
  //     ]
  //   )
  // });
  
  hide = true;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onRegister() {
    console.log("Register was sent!");
    const { username, email, password, confirmPassword } = this.form;
    this.authService.register(username, email, password, confirmPassword).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
