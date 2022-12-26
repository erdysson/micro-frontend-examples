import { Environment } from '../app/app.model';

export const environment: Environment = {
    production: true,
    remoteEntries: [
        {
            routePath: 'home',
            remoteEntry: 'http://localhost:4211/remoteEntry.js',
            remoteName: 'home',
            exposedModule: 'HomeModule',
        },
        {
            routePath: 'profile',
            remoteEntry: 'http://localhost:4212/remoteEntry.js',
            remoteName: 'profile',
            exposedModule: 'ProfileModule',
        },
    ],
};
