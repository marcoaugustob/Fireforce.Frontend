import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    /*animations: [
        trigger('fadeInOut', [
          transition('void => *', [
            style({ opacity: 0 }), //style only for transition transition (after transiton it removes)
            animate(1000, style({ opacity: 1 })) // the new state of the transition(after transiton it removes)
          ]),
          transition('* => void', [
            animate(600, style({ opacity: 0 })) // the new state of the transition(after transiton it removes)
          ])
        ])
      ]*/
})
export class AppComponent implements OnInit, OnDestroy {
    subscription: Subscription;

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title) {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(() => {
                let child = this.activatedRoute.firstChild;
                while (child) {
                    if (child.firstChild) {
                        child = child.firstChild;
                    } else if (child.snapshot.data && child.snapshot.data['title']) {
                        return child.snapshot.data['title'];
                    } else {
                        return null;
                    }
                }
                return null;
            })
        ).subscribe((data: any) => {
            if (data) {
                this.titleService.setTitle(data + ' - Portal de Atendimento - Fundação Copel');
            }
        });
    }

    ngOnInit() {
        this.subscription = this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd)
            )
            .subscribe(() => window.scrollTo(0, 0));
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
