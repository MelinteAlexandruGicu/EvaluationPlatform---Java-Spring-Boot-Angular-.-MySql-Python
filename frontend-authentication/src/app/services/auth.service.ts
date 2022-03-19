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
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + '/login', {
      username,
      password
    }, httpOptions);
  }

  register(username: FormControl, email: FormControl, password: FormControl, cPassword: FormControl): Observable<any> {
    return this.http.post(AUTH_API + '/register', {
      username,
      email,
      password,
      cPassword
    }, httpOptions);
  }
  logout(): Observable<any> {
    return this.http.post(AUTH_API + '/logout', {
    }, httpOptions);
  }

}
