

import { CommonModule } from "@angular/common";
import { CustomFormsModule } from 'ng2-validation';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxMaskModule } from 'ngx-mask';
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { RouterModule } from "@angular/router";
import { TranslateModule } from '@ngx-translate/core';

//COMPONENTS
import { CustomDataTableComponent } from './custom-datatable/custom-datatable.component';
import { CustomizerComponent } from './customizer/customizer.component';
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";

//DIRECTIVES
import { CookieService } from 'ngx-cookie-service';
import { FormValidator } from './validators/form.validator';
import { SearchPipe } from './pipes/search.pipe';
import { SidebarAnchorToggleDirective } from './directives/sidebaranchortoggle.directive';
import { SidebarDirective } from './directives/sidebar.directive';
import { SidebarLinkDirective } from './directives/sidebarlink.directive';
import { SidebarListDirective } from './directives/sidebarlist.directive';
import { SidebarToggleDirective } from './directives/sidebartoggle.directive';
import { ToggleFullscreenDirective } from "./directives/toggle-fullscreen.directive";
import { NgxCurrencyModule } from 'ngx-currency';
import { FindPipe } from './pipes/find.pipe';
import { UserService } from 'app/services/user.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorBase } from './interceptors/http.interceptor';
import { BlobErrorHttpInterceptor } from './interceptors/bloberror.http.interceptor';
import { FirstAndLastNamePipe } from './pipes/first-last-name.pipe';


@NgModule({
    exports: [
        CustomDataTableComponent,
        CustomizerComponent,
        FindPipe,
        FooterComponent,
        NavbarComponent,
        NgbModule,
        SearchPipe,
        SidebarComponent,
        SidebarDirective,
        ToggleFullscreenDirective,
        TranslateModule,
        FirstAndLastNamePipe
    ],
    imports: [
        CommonModule,
        CustomFormsModule,
        FormsModule,
        FormsModule,
        FormsModule,
        ImageCropperModule,
        NgSelectModule,
        NgSelectModule,
        NgbModule,
        NgxDropzoneModule,
        NgxCurrencyModule,
        NgxMaskModule.forRoot(),
        PerfectScrollbarModule,
        ReactiveFormsModule,
        RouterModule,
        TranslateModule,
    ],
    declarations: [
        CustomDataTableComponent,
        CustomizerComponent,
        FooterComponent,
        NavbarComponent,
        SearchPipe,
        SidebarAnchorToggleDirective,
        SidebarComponent,
        SidebarDirective,
        SidebarLinkDirective,
        SidebarListDirective,
        SidebarToggleDirective,
        ToggleFullscreenDirective,
        FindPipe,
        FirstAndLastNamePipe
    ],
    providers: [
        CookieService,
        FormValidator,
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
export class SharedModule { }
