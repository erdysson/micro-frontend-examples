import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { profileRoutes } from './profile.routes';

@NgModule({
    imports: [RouterModule.forChild(profileRoutes)],
    declarations: [ProfileComponent],
})
export class ProfileModule {}
