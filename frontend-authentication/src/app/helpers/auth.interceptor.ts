import { HTTP_INTERCEPTORS, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { TokenStorageService } from '../services/token-storage.service';
import { catchError, Observable } from 'rxjs';
import { throwError } from 'rxjs'

const TOKEN_HEADER_KEY = 'Authorization';    

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService) { }

  // method to inspect and transform HTTP requests before they are sent to server.
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authorizationReq = req;
    const token = this.token.getToken();
    if (token != null) {
      authorizationReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }
    return next.handle(authorizationReq).pipe(
    catchError(err => {
        // onError
        console.log(err);
        if (err instanceof HttpErrorResponse) {
            console.log(err.status);
            console.log(err.statusText);
            if (err.status === 401) {
                window.location.href = "/login";
            }
        }
        return throwError(err);
    })) as any;
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];