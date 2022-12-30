const path = require('path');
const { share, SharedMappings } = require('@angular-architects/module-federation/webpack');
const tsConfigPath = path.join(__dirname, '../../tsconfig.json');

const sharedMappings = new SharedMappings();

const workspaceRootPath = path.join(__dirname, '../../');

sharedMappings.register(tsConfigPath, [
    tsConfigPath,
    [
        /* mapped paths to share */
    ],
    workspaceRootPath,
]);

const getSharedPackages = (eager = false) =>
    share({
        '@angular/core': { eager, singleton: true, strictVersion: false, requiredVersion: 'auto' },
        '@angular/common': { eager, singleton: true, strictVersion: false, requiredVersion: 'auto' },
        '@angular/router': { eager, singleton: true, strictVersion: false, requiredVersion: 'auto' },
        '@angular/forms': { eager, singleton: true, strictVersion: false, requiredVersion: 'auto' },
        moment: { eager, singleton: true, strictVersion: false, requiredVersion: 'auto', includeSecondaries: true },
        ...sharedMappings.getDescriptors(),
    });

module.exports = {
    sharedMappings,
    getSharedPackages,
};
