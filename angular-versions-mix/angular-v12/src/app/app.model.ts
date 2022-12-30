import { NgZone } from '@angular/core';

declare global {
    interface Window {
        ngZone: NgZone;
    }
}

export type RemoteEntry = {
    routePath: string;
    remoteEntry: string;
    remoteName: string;
    exposedModule: string;
    hasMajorVersionDifference?: boolean;
};

export type Environment = {
    production: boolean;
    remoteEntries: RemoteEntry[];
};
