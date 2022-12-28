import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { sortBy } from 'lodash';
// eslint-disable-next-line import/no-namespace
import * as moment from 'moment';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    destroyed$ = new Subject<void>();

    title = 'angular-v15';

    form = this.fb.group({
        name: new FormControl(
            {
                value: '',
                disabled: false,
            },
            [Validators.required],
        ),
        password: new FormControl(
            {
                value: '',
                disabled: false,
            },
            [Validators.required],
        ),
    });

    constructor(private readonly fb: FormBuilder) {}

    ngOnInit(): void {
        // eslint-disable-next-line no-console
        console.log('sort by', sortBy);
        // eslint-disable-next-line no-console
        console.log('moment', moment);
        // eslint-disable-next-line no-console
        this.form.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe(console.log);
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
