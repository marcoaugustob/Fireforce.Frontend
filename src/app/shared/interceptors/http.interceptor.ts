import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { TokenService } from '../services/token.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import 'rxjs/Rx';
import { AuthService } from '../auth/auth.service';
import Swal from 'sweetalert2';

@Injectable()
export class HttpInterceptorBase implements HttpInterceptor {

    constructor(private tokenService: TokenService,
                private router: Router, private toast: ToastrService,
                private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = 'Bearer ' + this.tokenService.getLoggedToken();
        const headers = req.headers.set('Authorization', token ? token : '');
        const authReq = req.clone({ headers: headers });
        return next.handle(authReq).do(
            (event: any) => { },
            error => {
                if (error.status == 401) {
                    this.router.navigate(["/login"]);
                }
                else if (error.status == 403) {
                    this.unauthorized();
                }
                else if (error.status == 412) {
                    //precondidtion_failed = retornado quando inadimplente nas declarações, é tratado pela interface de declaracoes
                    return;
                }
                else if (error.status == 500) {
                    this.toast.error("Algo deu errado");
                }
                else if (error.message) {
                    this.toast.error(error.error.Message);
                }
                else {
                    this.toast.error("Sem conexão com o servidor, por favor tentar mais tarde!");
                }
            }
        ).finally(() => {
            // this.progressBarService.clear();
        });
    };

    unauthorized() {
        this.authService.updateRoles();
        Swal.fire({
            title: 'Ops',
            text: "No momento você não tem acesso a essa funcionalidade!",
            type: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok!',
            onClose: ()  => {
                this.authService.logout();
            }
        });
    };
}
