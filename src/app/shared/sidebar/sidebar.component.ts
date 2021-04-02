import { ROUTES } from './sidebar-routes.config';
import { Subscription } from 'rxjs';
import { TokenService } from '../services/token.service';
import { ConfigService } from '../services/config.service';
import { customAnimations } from '../animations/custom-animations';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({ selector: 'app-sidebar', templateUrl: './sidebar.component.html', styleUrls: ['./sidebar.component.scss'], animations: customAnimations })
export class SidebarComponent implements OnInit {
    user: any;
    depth: number;
    expanded: boolean;
    activeTitle: string;
    formGroup: FormGroup;
    public menuItems: any[];
    public config: any = {};
    layoutSub: Subscription;
    nav_collapsed_open = false;
    activeTitles: string[] = [];
    @ViewChild('toggleIcon', { static: false }) toggleIcon: ElementRef;

    constructor(private configService: ConfigService, tokenService: TokenService) {
        this.formGroup = new FormGroup({
            id: new FormControl(0),
            name: new FormControl(null, [Validators.required]),
            cpf: new FormControl(null, [Validators.required]),
            email: new FormControl(null, [Validators.required, Validators.maxLength(253), Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
            confirmEmail: new FormControl(null, [Validators.required, Validators.maxLength(253), Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
            phone: new FormControl(null, [Validators.required]),
            enable: new FormControl(true),
            companiesIds: new FormControl(null)
        });

        this.user = tokenService.getActiveUser();
    }

    ngOnInit() {
        this.config = this.configService.templateConf;
        if (this.user) {
            this.menuItems = ROUTES.filter(a => a.role == 'Publico' || this.user.roles.indexOf(a.role) !== -1);
        } else {
            this.menuItems = ROUTES.filter(a => a.role == 'Publico');
        }
    }

    toggleSlideInOut() {
        this.expanded = !this.expanded;
    }

    handleToggle(titles) {
        this.activeTitles = titles;
    }
}
