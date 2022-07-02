import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

export interface User {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
}

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})

export class BoardAdminComponent implements OnInit {
  public users = [];
  public titles: string[] = ['nr', 'role', 'username', 'firstname', 'lastname', 'email', 'operation'];
  constructor(private _authService: AuthService, private _tokenStorageService: TokenStorageService) { }
  ngOnInit(): void {
    this.getUsers();
  }

  @ViewChild(MatTable)
  table!: MatTable<User>;

  public getUsers() {
    this._authService.getUsers()
      .subscribe(
        data => {
          console.log(data);
          this.users = data;
        },
        error => {
          console.log(error);
        });
      
  }

  editUserRole() {
    console.log("Edit");
  }

  removeUser(id: number) {
    this._authService.deleteUser(id);
    this.table.renderRows();
    window.location.reload();
  }
}