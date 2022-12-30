import { Directive, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
    selector: '[appRouterExtension]',
})
export class RemoteModuleRouterExtensionDirective implements OnInit, OnDestroy {
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
