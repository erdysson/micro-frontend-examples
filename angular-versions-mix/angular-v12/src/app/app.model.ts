import { NgZone } from '@angular/core';

declare global {
    interface Window {
        ngZone: NgZone;
    }
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const __webpack_init_sharing__: (shareScope: string) => Promise<void>;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const __webpack_share_scopes__: { default: Scope };
}

export type Scope = unknown;

export type Factory = () => unknown;

export type Container = {
    init(shareScope: Scope): Promise<void>;
    get(moduleName: string): Promise<Factory>;
};

export type RemoteEntry = {
    routePath: string;
    remoteEntry: string;
    remoteName: string;
    exposedModule: string;
    type: 'module' | 'script';
};

export type Environment = {
    production: boolean;
    remoteEntries: RemoteEntry[];
};
