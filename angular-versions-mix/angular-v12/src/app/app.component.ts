import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { sortBy } from 'lodash';
// eslint-disable-next-line import/no-namespace
import * as moment from 'moment';
import { Subject, takeUntil } from 'rxjs';

import { Environment } from './app.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    readonly destroyed$ = new Subject<void>();

    readonly title = 'App component';

    constructor(private readonly router: Router, @Inject('env') readonly environment: Environment) {}

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
