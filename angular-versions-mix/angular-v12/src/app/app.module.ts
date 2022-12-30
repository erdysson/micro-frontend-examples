import { NgModule, NgZone } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { environment } from '../environments/environment';
import { RemoteModuleWrapperComponent } from '../module-federation/remote-module.wrapper.component';

import { appRoutes } from './app-routes';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent, RemoteModuleWrapperComponent],
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
