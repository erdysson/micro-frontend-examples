import { Environment } from '../app/app.model';

export const environment: Environment = {
    production: true,
    remoteEntries: [
        {
            routePath: 'angular-v15',
            remoteEntry: '/micro-frontend/angular-v15/remoteEntry.js',
            remoteName: 'angular-v15',
            exposedModule: './Component',
        },
    ],
};
