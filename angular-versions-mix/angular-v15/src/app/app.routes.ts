import { Routes } from '@angular/router';

import { AppRouteComponent } from './app.route.component';

enum AppRoutes {
    BASE = 'angular-v15',
    HOME = 'home',
    PROFILE = 'profile',
}

export const appRoutes: Routes = [
    {
        path: AppRoutes.BASE,
        component: AppRouteComponent,
        children: [
            {
                path: AppRoutes.HOME,
                // eslint-disable-next-line unicorn/no-await-expression-member
                loadChildren: async () => (await import('./home/home.module')).HomeModule,
            },
            {
                path: AppRoutes.PROFILE,
                // eslint-disable-next-line unicorn/no-await-expression-member
                loadChildren: async () => (await import('./profile/profile.module')).ProfileModule,
            },
            {
                path: '',
                redirectTo: AppRoutes.HOME,
            },
            {
                path: '**',
                redirectTo: AppRoutes.HOME,
            },
        ],
    },
    {
        path: '**',
        redirectTo: AppRoutes.BASE,
    },
];
