import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';

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
  @ViewChild(MatTable)
  private table!: MatTable<User>;
  public titles: string[] = ['nr', 'role', 'username', 'firstname', 'lastname', 'email', 'operation'];
  public users = [];
  constructor(private _authService: AuthService) { }

  public editUserRole() {
    console.log("Edit");
  }

  public removeUser(id: number, role: string) {
    if(role != "ROLE_ADMIN") {
      this._authService.deleteUser(id);
      this.table.renderRows();
      window.location.reload();
    }
    console.log("Nu se poate sterge admin");
    alert("Nu se poate sterge un utilizator admin!");
  }

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

  ngOnInit(): void {
    this.getUsers();
  }
}