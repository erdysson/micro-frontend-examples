import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

@NgModule({
    declarations: [UsersComponent],
    imports: [CommonModule, UsersRoutingModule, ReactiveFormsModule],
})
export class UsersModule {}
