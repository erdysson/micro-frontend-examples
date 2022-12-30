const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { sharedMappings, getSharedPackages } = require('./shared-mappings');

module.exports = {
    output: {
        publicPath: 'auto',
        uniqueName: 'usersApp',
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
            name: 'users',
            filename: 'remoteEntry.js',
            exposes: {
                UsersModule: './projects/users/src/app/users/users.module.ts',
            },
            shared: getSharedPackages(),
        }),
        sharedMappings.getPlugin(),
    ],
};
