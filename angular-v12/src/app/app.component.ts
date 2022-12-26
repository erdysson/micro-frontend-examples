import { Component, Inject, OnInit } from '@angular/core';
import { sortBy } from 'lodash';
// eslint-disable-next-line import/no-namespace
import * as moment from 'moment';

import { Environment } from './app.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    readonly title = 'App component';

    constructor(@Inject('env') readonly environment: Environment) {}

    ngOnInit(): void {
        // eslint-disable-next-line no-console
        console.log('moment', moment);
        // eslint-disable-next-line no-console
        console.log('sortBy', sortBy);
    }
}
