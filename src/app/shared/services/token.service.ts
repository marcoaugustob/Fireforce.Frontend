import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class TokenService {
    authTokenKey = environment.authTokenKey;
    userTokenKey = environment.userTokenKey;
    profileTokenKey: string;
    constructor(private cookieService: CookieService) { }

    getLoggedToken(): string {
        let token = this.cookieService.get(this.authTokenKey);
        if (token == "") {
            return null;
        }
        return token
    }

    setLoggedToken(token: string, domain?: string) {
        let date = new Date();
        date.setHours(date.getHours() + 2);
        this.cookieService.set(this.authTokenKey, token, date, '/', domain, false, 'Strict');
    }

    removeLoggedToken() {
        this.cookieService.delete(this.authTokenKey);
    }

    setLoggedUser(user: any) {
        localStorage.setItem(this.userTokenKey, JSON.stringify(user));
    }

    removeLoggedUser() {
        localStorage.removeItem(this.userTokenKey);
    }

    getActiveUser(): any {
        return JSON.parse(localStorage.getItem(this.userTokenKey));
    }

    setActiveUser(user: any) {
        localStorage.setItem(this.userTokenKey, JSON.stringify(user));
    }
}
