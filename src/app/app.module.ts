import { AgmCoreModule } from "@agm/core";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { AuthGuard } from "./shared/auth/auth-guard.service";
import { AuthService } from "./shared/auth/auth.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ChartModule } from 'angular-highcharts';
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";
import { DeviceDetectorModule } from 'ngx-device-detector';
import { DragulaService } from "ng2-dragula";
import { FileValidator } from './shared/validators/file-input.validator'
import { FileValueAccessor } from './shared/directives/input-file.directive'
import { FormsModule } from '@angular/forms';
import { FullLayoutComponent } from "./layouts/full/full-layout.component";
import { HighchartsService } from './shared/services/highcharts.service';
import { HttpClientModule } from "@angular/common/http";
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgModule, LOCALE_ID } from "@angular/core";
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { SharedModule } from "./shared/shared.module";
import { StoreModule } from "@ngrx/store";
import { ToastrModule } from "ngx-toastr";
import { registerLocaleData, DatePipe } from '@angular/common';
import localeBr from '@angular/common/locales/pt';
import { environment } from '../environments/environment';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = { suppressScrollX: true, wheelPropagation: false };

registerLocaleData(localeBr, 'pt');


@NgModule({
  imports: [
    AgmCoreModule.forRoot({ apiKey: "YOUR KEY" }),
    AppRoutingModule,
    BrowserAnimationsModule,
    ChartModule,
    DeviceDetectorModule.forRoot(),
    FormsModule,
    HttpClientModule,
    ImageCropperModule,
    NgbModule.forRoot(),
    PerfectScrollbarModule,
    SharedModule,
    StoreModule.forRoot({}),
    ToastrModule.forRoot(),

  ],
  declarations: [AppComponent, ContentLayoutComponent, FullLayoutComponent, FileValueAccessor, FileValidator],
  exports: [NgSelectModule],
  providers: [
    AuthGuard,
    AuthService,
    DatePipe,
    DragulaService,
    HighchartsService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    { provide: LOCALE_ID, useValue: 'pt' }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
