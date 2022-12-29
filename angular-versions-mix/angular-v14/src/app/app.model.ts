export type RemoteEntry = {
    routePath: string;
    remoteEntry: string;
    remoteName: string;
    exposedModule: string;
};

export type Environment = {
    production: boolean;
    remoteEntries: RemoteEntry[];
};
