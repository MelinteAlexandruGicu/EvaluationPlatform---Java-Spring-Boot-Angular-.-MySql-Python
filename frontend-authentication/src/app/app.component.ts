import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TokenStorageService } from './services/token-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  private roles: string[] = [];
  public isLoggedIn: boolean = false;
  public showAdminBoard: boolean = false;
  public showTeacherBoard: boolean = false;
  public showStudentBoard: boolean = false;
  public onLogin: boolean = false;
  public onRegister: boolean = false;
  public username?: string;
  public email?: string;
  public href: string = "";

  constructor(private _tokenStorageService: TokenStorageService, private _router: Router, private _jwtHelper: JwtHelperService) {}

  ngOnInit(): void {
    this.href = this._router.url;
    this.isLoggedIn = !!this._tokenStorageService.getToken();
    this._router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        if (ev.url.includes('/login')) {
          this.onLogin = true;
          this.onRegister = false;
        }
        if (ev.url.includes('/register')) {
          this.onLogin = false;
          this.onRegister = true;
        }
  }});
    if (this.isLoggedIn) {
      if (this._jwtHelper.isTokenExpired(this._tokenStorageService.getToken() as any)) {
        console.log("A expirat tokenul");
        this.logout();
        this._router.navigate(['/login']);
      }

      this._router.events.subscribe((ev) => {
        if (ev instanceof NavigationEnd) {
          const user = this._tokenStorageService.getUser();
          if(user?.roles) {
            this.roles = user?.roles[0];
          }
          this.username = user?.username;
                    
          if (this.username && this.roles && this.roles.includes("ROLE_STUDENT") && (ev.url.includes('/admin') || ev.url.includes('/teacher'))) {
              this._router.navigate(['/home']);
          }
          
          if (this.username && this.roles && this.roles.includes("ROLE_ADMIN") && (ev.url.includes('/student') || ev.url.includes('/teacher'))) {
            this._router.navigate(['/home']);
          }
  
          if (this.username && this.roles && this.roles.includes("ROLE_TEACHER") && (ev.url.includes('/student') || ev.url.includes('/admin'))) {
            this._router.navigate(['/home']);
            }
        } 
      }); 
      const user = this._tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showTeacherBoard = this.roles.includes('ROLE_TEACHER');
      this.showStudentBoard = this.roles.includes('ROLE_STUDENT');
      this.username = user.username;
      this.email = user.email;
    }
  }

  public logout(): void {
    this._tokenStorageService.logout();
    window.location.reload();
  }
}