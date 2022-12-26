import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { sortBy } from 'lodash';
// eslint-disable-next-line import/no-namespace
import * as moment from 'moment';
import { Subject } from 'rxjs';

@Component({
    selector: 'profile-app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
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
        this.form.valueChanges.subscribe(console.log);
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}
