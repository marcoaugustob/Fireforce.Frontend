import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { TokenService } from '../services/token.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {
    constructor(private router: Router, private http: HttpClient, private toast: ToastrService, private tokenService: TokenService) { }
    logout() {
        const url = `${environment.accessControlApi}/Authentication/logout`;
        this.http.delete(url, this.getHeader()).subscribe();
        this.tokenService.removeLoggedToken();
        this.tokenService.removeLoggedUser();
        (window as any).open(environment.accessControl + "sair?initials=" + environment.redirect, "_self");
    }

    isAuthenticated() {
        const token = this.tokenService.getLoggedToken();
        if (token) {
            const url = `${environment.accessControlApi}/Authentication/isauthenticated`;
            return this.http.get<boolean>(url, this.getHeader());
        } else {
            return Observable.of(false);
        }
    }

    updateRoles(callback?: any) {
        const url = `${environment.accessControlApi}/Authorization/GetRoles/Portal`;
        this.http.get<boolean>(url, this.getHeader()).subscribe(res => {
            var token = this.tokenService.getActiveUser();
            token.roles = res;
            this.tokenService.removeLoggedUser();
            this.tokenService.setLoggedUser(token);
            callback();
        });
    }

    updateUser(callback?: any) {
        const url = `${environment.accessControlApi}/Authentication/GetUser`;
        this.http.get(url, this.getHeader()).subscribe(
            res => {
                this.tokenService.setLoggedUser(res);
                callback();
            }, error => {
                (window as any).open(environment.accessControl + "login?initials=" + environment.redirect, "_self");
            });
    }

    getHeader() {
        const token = this.tokenService.getLoggedToken();
        if (token) {
            return { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }) };
        } else {
            return { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        }
    }
}
