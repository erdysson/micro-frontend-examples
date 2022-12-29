import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRouteComponent } from './app.route.component';
import { appRoutes } from './app.routes';

@NgModule({
    declarations: [AppComponent, AppRouteComponent],
    imports: [BrowserModule, RouterModule.forRoot(appRoutes)],
    bootstrap: [], // no bootstrap component
})
export class AppModule implements DoBootstrap {
    constructor(private readonly injector: Injector) {}

    ngDoBootstrap(): void {
        const customElement = createCustomElement(AppComponent, { injector: this.injector });
        // this selector has to be passed to module remoteEntry configuration in host application
        customElements.define('angular-v15-element', customElement);
    }
}
