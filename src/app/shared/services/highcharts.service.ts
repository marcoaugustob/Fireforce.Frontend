import * as Highcharts from 'highcharts';
import { Injectable } from '@angular/core';

@Injectable()
export class HighchartsService {
    createChart(el, cfg) {
        Highcharts.chart(el, cfg);
    }
}

// fonts: 
// https://www.tutorialspoint.com/angular_highcharts/angular_highcharts_line_basic.htm
// https://api.highcharts.com/highcharts/title