const { withModuleFederationPlugin, share } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
    name: 'angular-v15',
    exposes: {
        './Component': './src/bootstrap.ts',
    },
    shared: share({
        moment: { eager: false, singleton: true, strictVersion: true, requiredVersion: 'auto' },
    }),
});
