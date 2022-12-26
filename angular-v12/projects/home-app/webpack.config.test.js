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
            shared: getSharedPackages(true),
        }),
        sharedMappings.getPlugin(),
    ],
};
