import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { TokenStorageService } from "./token-storage.service";
  
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private _authService: AuthService, private _router: Router, private _tokenStorageService: TokenStorageService) { }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
        var isAuthenticated = !!this._tokenStorageService.getToken();
        if (!isAuthenticated) {
            this._router.navigate(['/login']);
        }
        return isAuthenticated;
    }
}