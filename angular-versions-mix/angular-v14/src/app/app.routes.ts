import {
    startsWith,
    WebComponentWrapper,
    WebComponentWrapperOptions,
} from '@angular-architects/module-federation-tools';
import { Routes } from '@angular/router';

import { environment } from '../environments/environment';

export const appRoutes: Routes = [
    {
        path: 'users',
        // eslint-disable-next-line unicorn/no-await-expression-member
        loadChildren: async () => (await import('./users/users.module')).UsersModule,
    },
    ...environment.remoteEntries.map((remoteEntryConfig) => ({
        matcher: startsWith(remoteEntryConfig.routePath),
        component: WebComponentWrapper,
        data: {
            type: 'module', // required for ng 13+
            remoteEntry: remoteEntryConfig.remoteEntry,
            exposedModule: remoteEntryConfig.exposedModule,
            elementName: `${remoteEntryConfig.remoteName}-element`,
        } as WebComponentWrapperOptions,
    })),
];
