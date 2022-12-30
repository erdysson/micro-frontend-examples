import { loadRemoteModule } from '@angular-architects/module-federation';
import { Routes } from '@angular/router';

import { environment } from '../environments/environment';
import { remoteUrlStartsWith } from '../module-federation/remote-module.url-matcher';
import { RemoteModuleWrapperComponent } from '../module-federation/remote-module.wrapper.component';

import { RemoteEntry } from './app.model';

export const appRoutes: Routes = [
    {
        path: 'dashboard',
        loadChildren: async () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    },
    ...environment.remoteEntries.map((remoteEntryConfig: RemoteEntry) =>
        remoteEntryConfig.type === 'module'
            ? {
                  matcher: remoteUrlStartsWith(remoteEntryConfig.routePath),
                  component: RemoteModuleWrapperComponent,
                  data: {
                      remoteEntryConfig,
                  },
              }
            : {
                  path: remoteEntryConfig.routePath,
                  loadChildren: async () =>
                      loadRemoteModule<RemoteEntry>({
                          remoteEntry: remoteEntryConfig.remoteEntry,
                          remoteName: remoteEntryConfig.remoteName,
                          exposedModule: remoteEntryConfig.exposedModule,
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                      }).then((m) => m[remoteEntryConfig.exposedModule]),
              },
    ),
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
