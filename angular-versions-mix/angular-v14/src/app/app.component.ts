import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
// eslint-disable-next-line import/no-namespace
import * as moment from 'moment';
import { Subject } from 'rxjs';

import { Environment } from './app.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'angular-v14';

    destroyed$ = new Subject<void>();

    constructor(@Inject('env') readonly environment: Environment) {}

    ngOnInit(): void {
        // eslint-disable-next-line no-console
        console.log(moment);
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
