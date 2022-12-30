import { Container, RemoteEntry } from '../app/app.model';

const containerMap: Partial<{ [key: string]: Container }> = {};
const remoteMap: Partial<{ [key: string]: boolean }> = {};
let isDefaultScopeInitialized = false;

const initRemote = async (container: Container, remoteEntry: string): Promise<Container> => {
    if (remoteMap[remoteEntry]) {
        return container;
    }

    if (!isDefaultScopeInitialized) {
        await __webpack_init_sharing__('default');
        isDefaultScopeInitialized = true;
    }
    await container.init(__webpack_share_scopes__.default);
    remoteMap[remoteEntry] = true;

    return container;
};

const loadRemoteModuleEntry = async (remoteEntry: string): Promise<void> => {
    if (containerMap[remoteEntry]) {
        return;
    }

    return import(/* webpackIgnore:true */ remoteEntry).then(async (container) => {
        await initRemote(container, remoteEntry);
        containerMap[remoteEntry] = container;
    });
};

const lookupExposedModule = async (remoteEntry: string, exposedModule: string): Promise<unknown> => {
    const container = containerMap[remoteEntry] as Container;
    const factory = await container.get(exposedModule);

    return factory();
};

export const loadRemoteModule = async (options: RemoteEntry): Promise<unknown> => {
    if (options.type !== 'module') {
        throw new Error('This implementation supports only "module" type');
    }

    await loadRemoteModuleEntry(options.remoteEntry);

    return await lookupExposedModule(options.remoteEntry, options.exposedModule);
};
