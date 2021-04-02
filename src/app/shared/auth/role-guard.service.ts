import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private tokenService: TokenService, private authService: AuthService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let user = this.tokenService.getActiveUser();
    if (user.roles.indexOf(next.data.role) !== -1)
      return true;

    const callback = () => {
      user = this.tokenService.getActiveUser();
      if (user.roles.indexOf(next.data.role) !== -1)
        return true;

      Swal.fire({
        title: 'Ops',
        text: "No momento você não tem acesso a essa funcionalidade!",
        type: 'error', confirmButtonColor: '#3085d6', confirmButtonText: 'Ok' });
      return false;
    };
    this.authService.updateRoles(callback);
  };
}
