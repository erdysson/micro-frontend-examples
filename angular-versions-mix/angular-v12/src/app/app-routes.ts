import { loadRemoteModule } from '@angular-architects/module-federation';
import { startsWith } from '@angular-architects/module-federation-tools';
import { Routes } from '@angular/router';

import { environment } from '../environments/environment';

import { RemoteEntry } from './app.model';
import { CustomElementWrapperComponent } from './custom-element-wrapper.component';

export const appRoutes: Routes = [
    {
        path: 'dashboard',
        loadChildren: async () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    },
    ...environment.remoteEntries.map((remoteEntryConfig: RemoteEntry) =>
        remoteEntryConfig.hasMajorVersionDifference
            ? {
                  matcher: startsWith(remoteEntryConfig.routePath),
                  component: CustomElementWrapperComponent,
                  data: {
                      remoteName: remoteEntryConfig.remoteName,
                      elementName: `${remoteEntryConfig.remoteName}-element`,
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
