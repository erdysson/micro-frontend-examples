import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { homeRoutes } from './home.routes';

@NgModule({
    imports: [RouterModule.forChild(homeRoutes)],
    declarations: [HomeComponent],
})
export class HomeModule {}
