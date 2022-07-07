import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { TokenStorageService } from "./token-storage.service";
  
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private _router: Router, private _tokenStorageService: TokenStorageService) { }
    
    canActivate(route: ActivatedRouteSnapshot, ): boolean | Promise<boolean> {
        var isAuthenticated = !!this._tokenStorageService.getToken();
        if (!isAuthenticated) {
            this._router.navigate(['/login']);
        }
        return isAuthenticated;
    }
}