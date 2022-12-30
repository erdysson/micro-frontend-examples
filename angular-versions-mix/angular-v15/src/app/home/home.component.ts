import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { sortBy } from 'lodash';
// eslint-disable-next-line import/no-namespace
import * as moment from 'moment';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
    readonly destroyed$ = new Subject<void>();

    constructor(private readonly router: Router) {}

    ngOnInit(): void {
        // eslint-disable-next-line no-console
        console.log('moment', moment);
        // eslint-disable-next-line no-console
        console.log('sortBy', sortBy);
        // eslint-disable-next-line no-console
        this.router.events.pipe(takeUntil(this.destroyed$)).subscribe(console.log);
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
