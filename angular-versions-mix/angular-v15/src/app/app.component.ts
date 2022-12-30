import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit, OnDestroy {
    constructor(private readonly router: Router) {
        this.onPopState = this.onPopState.bind(this);
    }

    ngOnInit(): void {
        this.onPopState();
        window.addEventListener('popstate', this.onPopState);
    }

    ngOnDestroy(): void {
        window.removeEventListener('popstate', this.onPopState);
    }

    private onPopState(): void {
        void this.router.navigateByUrl(location.pathname.slice(1));
    }
}
