import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:6060/api/auth';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _http: HttpClient) { }

  public login(username: string, password: string): Observable<any> {
    return this._http.post(AUTH_API + '/login', {
      username,
      password
    }, httpOptions);
  }

  public register(username: string, firstname: string, lastname: string, email: string, password: string, cPassword: string): Observable<any> {
    return this._http.post(AUTH_API + '/register', {
      username,
      firstname,
      lastname,
      email,
      password,
      cPassword
    }, httpOptions);
  }
}
