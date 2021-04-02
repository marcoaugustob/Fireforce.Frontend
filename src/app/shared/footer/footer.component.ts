import { Component } from '@angular/core';
import * as moment from 'moment';
@Component({ selector: 'app-footer', templateUrl: './footer.component.html', styleUrls: ['./footer.component.scss'] })

export class FooterComponent {
    date : string = moment().format("YYYY");
}
