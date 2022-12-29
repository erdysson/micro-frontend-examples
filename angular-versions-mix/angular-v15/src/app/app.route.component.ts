import { Component, OnDestroy, OnInit } from '@angular/core';
// eslint-disable-next-line import/no-namespace
import * as moment from 'moment';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-route',
    template: `
        <ul>
            <li><a routerLink="./home">Home</a></li>
            <li><a routerLink="./profile">Profile</a></li>
        </ul>
        <router-outlet></router-outlet>
    `,
})
export class AppRouteComponent implements OnInit, OnDestroy {
    destroyed$ = new Subject<void>();

    ngOnInit(): void {
        // eslint-disable-next-line no-console
        console.log(moment);
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
