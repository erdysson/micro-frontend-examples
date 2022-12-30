import { NgModule, NgZone } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { environment } from '../environments/environment';

import { appRoutes } from './app-routes';
import { AppComponent } from './app.component';
import { CustomElementWrapperComponent } from './custom-element-wrapper.component';

@NgModule({
    declarations: [AppComponent, CustomElementWrapperComponent],
    imports: [BrowserModule, RouterModule.forRoot(appRoutes)],
    providers: [
        {
            provide: 'env',
            useValue: environment,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(private readonly ngZone: NgZone) {
        window.ngZone = this.ngZone;
    }
}
