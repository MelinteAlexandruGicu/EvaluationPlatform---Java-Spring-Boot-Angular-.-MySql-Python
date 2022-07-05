import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { TokenStorageService } from "./token-storage.service";
  
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private _router: Router, private _tokenStorageService: TokenStorageService) { }
    
    canActivate(): boolean | Promise<boolean> {
        var isAuthenticated = !!this._tokenStorageService.getToken();
        var role = this._tokenStorageService.getUser().roles;
        console.log("ROL: " + role);
        if (!isAuthenticated) {
            this._router.navigate(['/login']);
        }

        // if (isAuthenticated && (role == "ROLE_STUDENT" || role == "ROLE_TEACHER")) {
        //     console.log("AICI1");    
        //     this._router.navigate(['/login']);
            
        // }

        // if (isAuthenticated && (role == "ROLE_ADMIN" || role == "ROLE_TEACHER") && this._router.url == "http://localhost:4200/student") {
        //     console.log("AICI2");
        //     this._router.navigate(['/login']);
            
        // }

        // if (isAuthenticated && (role == "ROLE_STUDENT" || role == "ROLE_ADMIN") && this._router.url == "http://localhost:4200/teacher") {
        //     console.log("AICI3");
        //     this._router.navigate(['/login']);
            
        // }
        return isAuthenticated;
    }
}