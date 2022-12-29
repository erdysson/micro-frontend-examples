import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { usersRoutes } from './users.routes';

@NgModule({
    imports: [CommonModule, RouterModule.forChild(usersRoutes)],
    declarations: [UsersComponent],
})
export class UsersModule {}
