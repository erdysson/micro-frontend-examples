const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { sharedMappings, getSharedPackages } = require('./shared-mappings');

module.exports = {
    output: {
        publicPath: 'auto',
        uniqueName: 'profileApp',
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
            name: 'profile',
            filename: 'remoteEntry.js',
            exposes: {
                ProfileModule: './projects/profile-app/src/app/profile/profile.module.ts',
            },
            shared: getSharedPackages(),
        }),
        sharedMappings.getPlugin(),
    ],
};
