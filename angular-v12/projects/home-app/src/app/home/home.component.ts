import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { sortBy } from 'lodash';
// eslint-disable-next-line import/no-namespace
import * as moment from 'moment';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'home-app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
    readonly destroyed$ = new Subject<void>();

    readonly form = this.fb.group({
        name: new FormControl({
            value: '',
            disabled: false,
        }),
    });

    constructor(private readonly fb: FormBuilder) {}

    ngOnInit(): void {
        // eslint-disable-next-line no-console
        console.log('moment', moment);
        // eslint-disable-next-line no-console
        console.log('sortBy', sortBy);
        // eslint-disable-next-line no-console
        this.form.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe(console.log);
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
