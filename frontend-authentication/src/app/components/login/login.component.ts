import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public errorMessage: string = '';
  public form: any = {
    username: null,
    password: null
  };
  public hide: boolean = true;
  public isLoggedIn: boolean = false;
  public isLoginFailed: boolean = false;
  public roles: string[] = [];
  public showAdminBoard: boolean = false;
  public showStudentBoard: boolean = false;
  public showTeacherBoard: boolean = false;
  constructor(private _authService: AuthService, private _tokenStorage: TokenStorageService, private _router: Router) { }

  public ngOnInit(): void {
    if (this._tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this._tokenStorage.getUser().roles;
    }

    this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    this.showTeacherBoard = this.roles.includes('ROLE_TEACHER');
    this.showStudentBoard = this.roles.includes('ROLE_STUDENT');
  }

  public onSubmit(): void {
    const { username, password } = this.form;
    this._authService.login(username, password).subscribe(
      data => {
        this._tokenStorage.saveToken(data.token);
        console.log("data: " + data.accessToken);
        this._tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this._tokenStorage.getUser().roles;
        window.location.reload();
        },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
}
