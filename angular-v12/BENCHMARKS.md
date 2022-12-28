### Summary

This document contains comparison of different configurations in terms of network aspects and bundle sizes.

### Motivation

As you may know or not, the packages shared with Module federation configuration, are not **tree-shakable!** Since webpack can not know what part of the shared package could be consumed in runtime by another remote, shared packages are not eligible for tree-shaking!

### Note

Normally, the examples you find online contains only framework packages without any other 3rd party dependencies. While this can be misleading, also does not really reflect a real world use case.

For this purpose, two famous packages are added to repo with dummy usages,

- [moment](https://github.com/moment/moment) (non-tree-shakable, added on purpose to use it as shared and not shared)
- [lodash](https://github.com/lodash/lodash) (perfectly tree-shakable)

Dramatically, existence of those two packages already increased the bundle sizes to almost **1Mb** (without compression).

### Comparisons

#### 1 - configuration eager:false in host and remote applications

This is the default setting in this example applications.

Here is the [link](./docs/benchmarks/NON_EAGER_BENCHMARK.md) for details

##### Pros:

- Smaller bundle size
- Better page load performance

##### Cons:

- Too many initial file requests

#### 2 - configuration eager:true in host and remote applications

In order to see the difference, replace

```javascript
shared: getSharedPackages()
```

part of the configuration in three **webpack.config.js** file with:

```javascript
shared: getSharedPackages(true)
```

Here is the [link](./docs/benchmarks/EAGER_BENCHMARK.md) for details

### Pros:

- Less number of asset requests

### Cons:

- bundles are filled with duplicates in main.js and polyfills.js
- worse initial load metrics
- currently there's already an open bug and resolved yet in this manner: https://github.com/module-federation/module-federation-examples/issues/693

#### 3 - shared mappings configuration with rxjs included and eager: false in host and remote applications

To perform this comparison, add the line below to **shared-mappings.js** in all three projects on line 23:

```javascript
rxjs: { eager, singleton: true, strictVersion: false, requiredVersion: 'auto', includeSecondaries: true }
```

Here is the [link](./docs/benchmarks/NON_EAGER_RXJS_SHARED_BENCHMARK.md) for details

##### Pros:

- less amount of asset transfer in remote applications

##### Cons:

- more requests on host compared to non-shared rxjs version
- longer load time and slightly more data transfer over network
- higher amount of data transfer on remote application on page reload

#### 4 - shared mappings configuration with moment (non-tree-shakable) included and eager: false in host and remote applications

To perform this comparison, add the line below to **shared-mappings.js** in all three projects on line 23:

```javascript
moment: { eager, singleton: true, strictVersion: false, requiredVersion: 'auto', includeSecondaries: true }
```

Here is the [link](./docs/benchmarks/NON_EAGER_MOMENT_SHARED_BENCHMARK.md) for details

##### Pros:

- way smaller bundle size (not in host, but in remotes)
- separated moment.js bundle that can take advantage of browser cache
- better lighthouse performance scores

##### Cons:

- one extra request for separate bundle
