import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from 'app/shared/services/token.service';
import { Router } from '@angular/router';

@Injectable()
export abstract class BaseService {

    constructor(private router: Router,protected http: HttpClient, protected tokenService: TokenService) { }
   
    createHeader(): HttpHeaders {
        const user = this.tokenService.getActiveUser();
      
        if(!user){
            this.router.navigate(["/login"]);
        }
       

        if (this.tokenService.getLoggedToken())
            return new HttpHeaders({ 'Authorization': 'Bearer ' + this.tokenService.getLoggedToken(), 
            'content-type': 'application/json'});
        else
            return new HttpHeaders({ 'content-type': 'application/json' });
    }

    paramsToQueryString(params: any) {
        let result = '';
        for (const propertyName in params) {
            if (params && params[propertyName] !== undefined && params[propertyName] !== null && params[propertyName] !== '') {
                if (Array.isArray(params[propertyName])) {
                    for (const item of params[propertyName]) {
                        result += propertyName + '=' + item + '&';
                    }
                } else {
                    result += propertyName + '=' + params[propertyName] + '&';
                }
            }
        }
        return result.substring(0, result.length - 1);
    }
}