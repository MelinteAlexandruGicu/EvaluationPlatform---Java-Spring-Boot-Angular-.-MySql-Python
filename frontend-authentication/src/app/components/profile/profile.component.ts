import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public currentUser: any;
  constructor(private _token: TokenStorageService) { }
  ngOnInit(): void {
    this.currentUser = this._token.getUser();
    console.log(this.currentUser)
  }
}
