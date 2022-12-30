const containerMap = {};
const remoteMap = {};
let isDefaultScopeInitialized = false;

const lookupExposedModule = async (key, exposedModule) => {
    const container = containerMap[key];
    const factory = await container.get(exposedModule);

    return factory();
};

const initRemote = async (container, key) => {
    // const container = window[key] as Container;
    // Do we still need to initialize the remote?
    if (remoteMap[key]) {
        return container;
    }
    // Do we still need to initialize the share scope?
    if (!isDefaultScopeInitialized) {
        await __webpack_init_sharing__('default');
        isDefaultScopeInitialized = true;
    }
    await container.init(__webpack_share_scopes__.default);
    remoteMap[key] = true;

    return container;
};

const loadRemoteModuleEntry = async (remoteEntry) => {
    if (containerMap[remoteEntry]) {
        return;
    }

    return await import(/* webpackIgnore:true */ remoteEntry).then((container) => {
        initRemote(container, remoteEntry);
        containerMap[remoteEntry] = container;
    });
};

const loadRemoteScriptEntry = async (remoteEntry, remoteName) =>
    new Promise((resolve, reject) => {
        // Is remoteEntry already loaded?
        if (containerMap[remoteName]) {
            resolve();

            return;
        }
        const script = document.createElement('script');
        script.src = remoteEntry;
        script.onerror = reject;
        script.addEventListener('load', () => {
            const container = window[remoteName];
            initRemote(container, remoteName);
            containerMap[remoteName] = container;
            resolve();
        });
        document.body.append(script);
    });

export const loadRemoteEntry = async (remoteEntryOrOptions, remoteName) => {
    if (typeof remoteEntryOrOptions === 'string') {
        const remoteEntry = remoteEntryOrOptions;

        return await loadRemoteScriptEntry(remoteEntry, remoteName);
    } else if (remoteEntryOrOptions.type === 'script') {
        const options = remoteEntryOrOptions;

        return await loadRemoteScriptEntry(options.remoteEntry, options.remoteName);
    } else if (remoteEntryOrOptions.type === 'module') {
        const options = remoteEntryOrOptions;
        await loadRemoteModuleEntry(options.remoteEntry);
    }
};

export const loadRemoteModule = async (options) => {
    let loadRemoteEntryOptions;
    let key;

    const remoteEntry = options.remoteEntry;
    // To support legacy API (< ng 13)
    if (!options.type) {
        options.type = 'script';
    }

    if (options.type === 'script') {
        loadRemoteEntryOptions = {
            type: 'script',
            remoteEntry: options.remoteEntry,
            remoteName: options.remoteName,
        };
        key = options.remoteName;
    } else if (options.type === 'module') {
        loadRemoteEntryOptions = {
            type: 'module',
            remoteEntry: options.remoteEntry,
        };
        key = options.remoteEntry;
    }
    if (remoteEntry) {
        await loadRemoteEntry(loadRemoteEntryOptions);
    }

    return await lookupExposedModule(key, options.exposedModule);
};
