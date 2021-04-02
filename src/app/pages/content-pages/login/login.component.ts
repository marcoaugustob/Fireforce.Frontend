import { Component, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/shared/auth/auth.service';
import { TokenService } from 'app/shared/services/token.service';
import { UserService } from 'app/services/user.service';
import { BaseProfile } from './base-profile.component';

@Component({ selector: 'app-login', template: '' })
export class LoginPageComponent {
    loading: boolean = true;
    profile: any;

    constructor(private router: Router, private authService: AuthService, private userService: UserService,
        private tokenService: TokenService, private route: ActivatedRoute) {
        // super(tokenService);
        this.route.queryParams.subscribe(params => {
            if (params.token) {
                this.tokenService.setLoggedToken(params.token);
            }
            const callback = () => {
            };
            this.authService.updateUser(callback);
        });
    };

    
}
