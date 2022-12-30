import { Container, RemoteEntry } from '../app/app.model';

let isDefaultScopeInitialized = false;
const containerMap: Partial<{ [key: string]: boolean }> = {};

const initRemote = async (container: Container, remoteEntryConfig: RemoteEntry): Promise<unknown> => {
    if (!isDefaultScopeInitialized) {
        await __webpack_init_sharing__('default');
        isDefaultScopeInitialized = true;
    }
    await container.init(__webpack_share_scopes__.default);

    containerMap[remoteEntryConfig.remoteEntry] = true;

    const factory = await container.get(remoteEntryConfig.exposedModule);

    return factory();
};

const loadRemoteModuleEntry = async (remoteEntryConfig: RemoteEntry): Promise<unknown> => {
    if (containerMap[remoteEntryConfig.remoteEntry]) {
        return;
    }

    return import(/* webpackIgnore:true */ remoteEntryConfig.remoteEntry).then(async (container) =>
        initRemote(container, remoteEntryConfig),
    );
};

export const remoteModuleLoader = async (remoteEntryConfig: RemoteEntry): Promise<unknown> => {
    if (remoteEntryConfig.type !== 'module') {
        throw new Error('This implementation supports only "module" type');
    }

    return loadRemoteModuleEntry(remoteEntryConfig);
};
