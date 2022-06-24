import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './services/token-storage.service';
import { trigger, transition, group, query, style, animate } from '@angular/animations';

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
  public username?: string;
  public email?: string;
  public href: string = "";

  constructor(private tokenStorageService: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    this.href = this.router.url;
    console.log(this.href);
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showTeacherBoard = this.roles.includes('ROLE_TEACHER');
      this.showStudentBoard = this.roles.includes('ROLE_STUDENT');
      this.username = user.username;
      this.email = user.email;
    }
  }

  public logout(): void {
    this.tokenStorageService.logout();
    window.location.reload();
  }
}