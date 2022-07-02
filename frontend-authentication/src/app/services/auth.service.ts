import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public API_URL = 'http://localhost:6060/api/auth';
  public httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
  constructor(private _http: HttpClient) { }

  public login(username: string, password: string): Observable<any> {
    return this._http.post(`${this.API_URL}/login`, {
      username,
      password
    }, this.httpOptions);
  }

  public register(username: string, firstname: string, lastname: string, email: string, password: string, cPassword: string): Observable<any> {
    return this._http.post(`${this.API_URL}/register`, {
      username,
      firstname,
      lastname,
      email,
      password,
      cPassword
    }, this.httpOptions);
  }

  public getUsers(): Observable<any> {
    return this._http.get(`${this.API_URL}/users`);
  }

  public deleteUser(id: number) {
    return this._http.delete(this.API_URL + "/user/" + id).subscribe(data => {
      console.log(data);
    });
  }

  public updateUserUsername(id: number, username: string) {
    const formData: FormData = new FormData();
    console.log(username);
    formData.append('username', username);
    return this._http.post(this.API_URL + "/user-update-username/" + id, formData).subscribe(data => {
      console.log(data);
    });
  }
}
