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
    firstname: null,
    lastname: null,
    email: null,
    password: null,
    confirmPassword: null
  }
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
