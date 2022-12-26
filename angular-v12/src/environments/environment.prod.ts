import { Environment } from '../app/app.model';

export const environment: Environment = {
    production: true,
    remoteEntries: [
        {
            routePath: 'home',
            remoteEntry: '/micro-frontend/home/remoteEntry.js',
            remoteName: 'home',
            exposedModule: 'HomeModule',
        },
        {
            routePath: 'profile',
            remoteEntry: '/micro-frontend/profile/remoteEntry.js',
            remoteName: 'profile',
            exposedModule: 'ProfileModule',
        },
    ],
};
