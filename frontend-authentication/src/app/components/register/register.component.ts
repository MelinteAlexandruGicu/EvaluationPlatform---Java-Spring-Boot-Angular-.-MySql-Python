import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public isSuccessful: boolean = false;
  public isSignUpFailed: boolean = false;
  public hide: boolean = true;
  public errorMessage: string = '';
  public form: any = {
    username: null,
    firstname: null,
    lastname: null,
    email: null,
    password: null,
    confirmPassword: null
  }

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
  }

  public onRegister() {
    console.log("Register was sent!");
    const { username, firstname, lastname, email, password, confirmPassword } = this.form;
    this._authService.register(username, firstname, lastname, email, password, confirmPassword).subscribe(
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
