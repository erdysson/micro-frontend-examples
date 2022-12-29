const { share, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
    shared: share({
        // '@angular/core': { eager: false, singleton: true, strictVersion: true, requiredVersion: 'auto' },
        // '@angular/common': { eager: false, singleton: true, strictVersion: true, requiredVersion: 'auto' },
        // '@angular/router': { eager: false, singleton: true, strictVersion: true, requiredVersion: 'auto' },
        moment: { eager: false, singleton: true, strictVersion: false, requiredVersion: 'auto' },
    }),
});
