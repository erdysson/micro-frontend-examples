import { environment } from '../environments/environment';

import { loadRemoteModule } from './load-remote-entry';

// eslint-disable-next-line unicorn/no-array-reduce,unicorn/prefer-object-from-entries
export const appRoutesRegistry = environment.remoteEntries.reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (result: { [key: string]: () => Promise<any> }, remoteEntryConfig) => {
        if (remoteEntryConfig.hasMajorVersionDifference) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            result[remoteEntryConfig.remoteName] = async (): Promise<any> =>
                loadRemoteModule({
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    type: 'module',
                    remoteName: remoteEntryConfig.remoteName,
                    remoteEntry: remoteEntryConfig.remoteEntry,
                    exposedModule: remoteEntryConfig.exposedModule,
                });
        }

        return result;
    },
    {},
);
