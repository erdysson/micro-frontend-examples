### Directory

This directory is about module federation implementation of a host and two micro frontends using **angular v12.2.16**

### Install
Install dependencies by running

```
npm install
```

under angular-v12 directory of this repository 

### Start

Simply to serve all applications locally, run

```
npm run serve
```

It uses concurrently under the hood to start all applications in parallel for convenience.

### Setup

This project uses [module federation plugin](https://github.com/angular-architects/module-federation-plugin) from angular-architects.

There are 2 sets of webpack configurations, one for host application and one for (each are identical) remote applications (home & profile)

Host application setup in **main** branch is as follows:

#### Host setup

**shared-mappings.js**

```javascript
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
        'moment': { eager, singleton: true, strictVersion: false, requiredVersion: 'auto' },
        ...sharedMappings.getDescriptors(),
    });

module.exports = {
    sharedMappings,
    getSharedPackages,
};
```

**webpack.config.js**

```javascript
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { sharedMappings, getSharedPackages } = require('./shared-mappings');

module.exports = {
    output: {
        publicPath: 'auto',
        uniqueName: 'homeApp',
    },
    optimization: {
        runtimeChunk: false,
    },
    resolve: {
        alias: {
            ...sharedMappings.getAliases(),
        },
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'home',
            filename: 'remoteEntry.js',
            exposes: {
                HomeModule: './projects/home-app/src/app/home/home.module.ts',
            },
            shared: getSharedPackages(),
        }),
        sharedMappings.getPlugin(),
    ],
};
```

#### Why shared-mappings and webpack config is separated?

**Eager** load of host and remote applications has some performance drawbacks which you can see the comparison below.
Setting **eager** property to **false** play nice for **runtime**, unfortunately it does not as nice as while running tests with **karma**.
As a result we have two configurations that loads shared packages with eager: false for build task, and eager: true for tests.

#### Remote setup

**shared-mappings.js** (home application)

```javascript
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
        'moment': { eager, singleton: true, strictVersion: false, requiredVersion: 'auto' },
        ...sharedMappings.getDescriptors(),
    });

module.exports = {
    sharedMappings,
    getSharedPackages,
};
```

**webpack.config.js** (home application)

```javascript
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { sharedMappings, getSharedPackages } = require('./shared-mappings');

module.exports = {
    output: {
        publicPath: 'auto',
        uniqueName: 'homeApp',
    },
    optimization: {
        runtimeChunk: false,
    },
    resolve: {
        alias: {
            ...sharedMappings.getAliases(),
        },
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'home',
            filename: 'remoteEntry.js',
            exposes: {
                HomeModule: './projects/home-app/src/app/home/home.module.ts',
            },
            shared: getSharedPackages(),
        }),
        sharedMappings.getPlugin(),
    ],
};
```
### Benchmarks

[Here](./BENCHMARKS.md) is the benchmarks for some different combinations of setup and packages
