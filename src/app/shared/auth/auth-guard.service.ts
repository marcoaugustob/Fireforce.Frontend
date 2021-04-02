import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from 'environments/environment';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.authService.isAuthenticated().map((auth) => {
            if (!environment.production) return true;
            if (auth) return true;
            (window as any).open(environment.accessControl + "login?initials=" + environment.redirect, "_self");
            return false;
        }).first();
    }
}
