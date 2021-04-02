import { Router } from '@angular/router';
import { TokenService } from '../../../shared/services/token.service';

export class BaseProfile {

    constructor(private tokenService: TokenService) { }

    updateLoggedUser() {
        let actualUser = this.tokenService.getActiveUser();
        this.tokenService.removeLoggedUser();
        this.tokenService.setLoggedUser(actualUser);
    }
}