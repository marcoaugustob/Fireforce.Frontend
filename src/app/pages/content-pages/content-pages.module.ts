import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContentPagesRoutingModule } from "./content-pages-routing.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { ErrorPageComponent } from "./error/error-page.component";
import { LoginPageComponent } from './login/login.component';
import { FileSaverModule } from 'ngx-filesaver';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        ContentPagesRoutingModule,
        FormsModule,
        NgSelectModule,
        NgbModule,
        ReactiveFormsModule,
        FileSaverModule,
        PdfViewerModule,
        SharedModule
    ],
    declarations: [
        ErrorPageComponent,
        LoginPageComponent,
        AccessDeniedComponent,
    ]
})
export class ContentPagesModule { }
