import { Environment } from '../app/app.model';

export const environment: Environment = {
    production: true,
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
