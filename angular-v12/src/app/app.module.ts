import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { environment } from '../environments/environment';

import { appRoutes } from './app-routes';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, RouterModule.forRoot(appRoutes)],
    providers: [
        {
            provide: 'env',
            useValue: environment,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
