import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public currentUser: any;
  
  constructor(private _token: TokenStorageService, private _authService: AuthService) { }
   
  ngOnInit(): void {
    this.currentUser = this._token.getUser();
   
  }

  public updateUser(id:number, username:string) {
    this._authService.updateUserUsername(id, username);
  }
}
