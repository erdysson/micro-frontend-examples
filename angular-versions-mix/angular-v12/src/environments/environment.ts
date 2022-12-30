// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environment } from '../app/app.model';

export const environment: Environment = {
    production: false,
    remoteEntries: [
        {
            routePath: 'users',
            remoteEntry: '/micro-frontend/users/remoteEntry.js',
            remoteName: 'users',
            exposedModule: 'UsersModule',
            type: 'script',
        },
        {
            routePath: 'angular-v15',
            remoteEntry: '/micro-frontend/angular-v15/remoteEntry.js',
            remoteName: 'angular-v15',
            exposedModule: './Component',
            type: 'module',
        },
    ],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
