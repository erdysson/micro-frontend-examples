const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { sharedMappings, getSharedPackages } = require('./shared-mappings');

module.exports = {
    output: {
        publicPath: 'auto',
        uniqueName: 'app',
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
            shared: getSharedPackages(),
        }),
        sharedMappings.getPlugin(),
    ],
};
