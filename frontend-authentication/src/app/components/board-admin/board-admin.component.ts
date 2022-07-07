import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { interval } from 'rxjs';
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
  public isAdmin: boolean = false;
  public interval$: any;
  public timer:number = 2;
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
    console.log("Can't delete an admin");
    this.isAdmin = true;
    this.interval$ = interval(1000).subscribe(
      result => {
        this.timer--;
        if(this.timer === 0) {
          this.isAdmin = false
        }
      });
  }

  public convertName(name: string) {
    if (name == "ROLE_ADMIN")
      return "Administrator";
    if (name == "ROLE_TEACHER")
      return "Teacher";
    if (name == "ROLE_STUDENT")
      return "Student";
    return "NoRole";
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
