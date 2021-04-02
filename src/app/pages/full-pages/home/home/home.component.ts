import { Component, ElementRef, OnInit } from '@angular/core';
import { genericAnimations } from 'app/animations';
import ScrollOut from "scroll-out";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: genericAnimations
})
export class HomeComponent implements OnInit {
  so: any;

  constructor() { }
  ngOnInit() {

    this.so = ScrollOut({
      targets: 'h2,p'
    });
  }
}
