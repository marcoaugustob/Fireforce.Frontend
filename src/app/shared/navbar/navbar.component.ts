import { Component, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UserService } from 'app/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenService } from '../services/token.service';

@Component({ selector: "app-navbar", templateUrl: "./navbar.component.html", styleUrls: ["./navbar.component.scss"] })
export class NavbarComponent {
  @Output() toggleHideSidebar = new EventEmitter<Object>();
  @ViewChild('userDropdown', { static: false }) dropdownMenu: ElementRef;
  @ViewChild('sidebar', { static: false }) sidebar: ElementRef;

  person: any;
  profilePicture: any = null;
  show: boolean = true;
  

  constructor( private authService: AuthService, private userService: UserService,
    private modalService: NgbModal, private tokenService: TokenService) {
  }

  toggleSidebar() {
    const element = document.getElementById('sidebar');
    if (element.classList.contains('active')) {
      element.classList.remove('active');
    } else {
      element.classList.add('active');
    }
  }


  // uploadImg() { this.modalService.open(ImgCropperModalComponent, { size: 'lg', centered: true }); };

  logout() { this.authService.logout(); }

}

