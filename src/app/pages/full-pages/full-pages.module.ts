import { AgmCoreModule } from '@agm/core';
import { ChartistModule } from 'ng-chartist';
import { CommonModule } from "@angular/common";
import { DisableControlModule } from '../../shared/directives/disable-control.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullPagesRoutingModule } from "./full-pages-routing.module";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorBase } from '../../shared/interceptors/http.interceptor';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';
import { NgxCurrencyModule } from 'ngx-currency';
import { RoleGuard } from 'app/shared/auth/role-guard.service';
import { SharedModule } from '../../shared/shared.module';
import { TokenService } from '../../shared/services/token.service';
import { UserService } from 'app/services/user.service';
import { HomeComponent } from './home/home/home.component';
import { PreventDoubleSubmitModule } from '../../shared/directives/prevent-double-submit.directive';
import { FocusModule } from '../../shared/directives/focus-invalid-input.directive';
import { BlobErrorHttpInterceptor } from 'app/shared/interceptors/bloberror.http.interceptor';

@NgModule({
    imports: [
        AgmCoreModule,
        ChartistModule,
        CommonModule,
        DisableControlModule,
        FocusModule,
        FormsModule,
        FullPagesRoutingModule,
        NgSelectModule,
        NgbModule,
        NgxCurrencyModule,
        NgxMaskModule.forRoot(),
        PreventDoubleSubmitModule,
        ReactiveFormsModule,
        SharedModule,
    ],
    declarations: [
        HomeComponent,
    ],
    providers: [
        RoleGuard,
        TokenService,
        UserService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: BlobErrorHttpInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorBase,
            multi: true
        }
    ],
    entryComponents: [
    ]
})
export class FullPagesModule { }
