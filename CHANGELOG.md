# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="3.1.0"></a>
# [3.1.0](https://gitlab.com/iiroj/react-universal-boilerplate/compare/v3.0.0...v3.1.0) (2018-10-10)


### Bug Fixes

* Fix typechecking issues ([843625d](https://gitlab.com/iiroj/react-universal-boilerplate/commit/843625d))


### Features

* Add fork-ts-checker-webpack-plugin ([f5c16ab](https://gitlab.com/iiroj/react-universal-boilerplate/commit/f5c16ab))



<a name="3.0.0"></a>
# [3.0.0](https://gitlab.com/iiroj/react-universal-boilerplate/compare/v2.1.2...v3.0.0) (2018-10-10)


### Bug Fixes

* Fix Issues with building ([3fd8df1](https://gitlab.com/iiroj/react-universal-boilerplate/commit/3fd8df1))


### Features

* Rewrite in TypeScript ([8a94569](https://gitlab.com/iiroj/react-universal-boilerplate/commit/8a94569))


### BREAKING CHANGES

* This boilerplate has migrated to TypeScript, so there’s bound to be a lot of breaking changes.



<a name="2.1.2"></a>
## [2.1.2](https://gitlab.com/iiroj/react-universal-boilerplate/compare/v2.1.1...v2.1.2) (2018-10-02)



<a name="2.1.1"></a>
## [2.1.1](https://gitlab.com/iiroj/react-universal-boilerplate/compare/v2.1.0...v2.1.1) (2018-10-02)


### Bug Fixes

* Re-require App in SSR during development ([84452cc](https://gitlab.com/iiroj/react-universal-boilerplate/commit/84452cc))
* Use if instead of switch statement in babel config ([2211653](https://gitlab.com/iiroj/react-universal-boilerplate/commit/2211653))



<a name="2.1.0"></a>
# [2.1.0](https://gitlab.com/iiroj/react-universal-boilerplate/compare/v2.0.3...v2.1.0) (2018-09-27)


### Features

* Reload things server-side ([c141afc](https://gitlab.com/iiroj/react-universal-boilerplate/commit/c141afc))
* Use webpack-hot-middleware ([36766ab](https://gitlab.com/iiroj/react-universal-boilerplate/commit/36766ab))



<a name="2.0.3"></a>
## [2.0.3](https://gitlab.com/iiroj/react-universal-boilerplate/compare/v2.0.2...v2.0.3) (2018-09-22)



<a name="2.0.2"></a>
## [2.0.2](https://gitlab.com/iiroj/react-universal-boilerplate/compare/v2.0.1...v2.0.2) (2018-09-15)


### Bug Fixes

* UniversalComponent doesn’t work with relative imports ([58d8e63](https://gitlab.com/iiroj/react-universal-boilerplate/commit/58d8e63))



<a name="2.0.1"></a>
## [2.0.1](https://gitlab.com/iiroj/react-universal-boilerplate/compare/v2.0.0...v2.0.1) (2018-09-10)



<a name="2.0.0"></a>
# [2.0.0](https://gitlab.com/iiroj/react-universal-boilerplate/compare/v1.0.1...v2.0.0) (2018-09-10)


### Features

* Disable SSR when developing ([4053631](https://gitlab.com/iiroj/react-universal-boilerplate/commit/4053631))


### BREAKING CHANGES

* SSR is no longer used in development mode. This has the major benefit of being faster (no rendering of React), obviously. In the client side ReactDOM.hydrate is only used in production, while ReactDOM.render is used when developing.

Another benefit is that previously, the server was run via @babel/node and restarted with nodemon on changes to server code. This slowed rebuilding and also wasn’t perferct. It didn’t detect changes in the client code, which is only babeled (for SSR) once.

To keep SSR when developing, we would need to always restart @babel/node on changes to ‘src/‘. The packabe ‘babel-watch’ does this, but it’s no longer maintained and incompatible with Babel 7.

All in all I think change is for a better Developer Experience.



<a name="1.0.1"></a>
## [1.0.1](https://gitlab.com/iiroj/react-universal-boilerplate/compare/v1.0.0...v1.0.1) (2018-09-09)


### Bug Fixes

* Fix loading of multiple font weights ([ff0edf5](https://gitlab.com/iiroj/react-universal-boilerplate/commit/ff0edf5))
* Workaround for bug with react-universal-component ([848281a](https://gitlab.com/iiroj/react-universal-boilerplate/commit/848281a))



<a name="1.0.0"></a>
# [1.0.0](https://gitlab.com/iiroj/react-universal-boilerplate/compare/v0.6.2...v1.0.0) (2018-09-07)


### Features

* Use only ‘css’ from ‘emotion’ ([4fe2e67](https://gitlab.com/iiroj/react-universal-boilerplate/commit/4fe2e67))


### BREAKING CHANGES

* This removes the ‘react-emotion’ package



<a name="0.6.2"></a>
## [0.6.2](https://gitlab.com/iiroj/react-universal-boilerplate/compare/v0.6.1...v0.6.2) (2018-08-28)



<a name="0.6.1"></a>
## [0.6.1](https://gitlab.com/iiroj/react-universal-boilerplate/compare/v0.6.0...v0.6.1) (2018-08-22)



<a name="0.6.0"></a>
# [0.6.0](https://gitlab.com/iiroj/react-universal-boilerplate/compare/v0.5.2...v0.6.0) (2018-08-16)


### Features

* Use standard-version ([528275c](https://gitlab.com/iiroj/react-universal-boilerplate/commit/528275c))



# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [0.5.2] - 2018-08-09
### Changed
- Update packages
- Update readme

## [0.5.1] - 2018-07-31
### Changed
- Update packages
### Removed
- Deprecate `@babel/preset-stage-3`

## [0.5.0] - 2018-07-23
### Fixed
- Move usage of `react-universal-component` to same directory level as the pages, so that `webpack-flush-chunks` can detect bundles correctly
  * It seems webpack named bundles as `foo/Bar` whereas other utilies expect `foo-Bar`; this is circumvented by imports not needing multiple levels of directories

## [0.4.0] - 2018-07-20
### Changed
- Switch back to `redux-first-router`
- Update packages

## [0.3.0] - 2018-07-16
### Added
- Use `common-tags` to render nicer html and
### Changed
- Update packages

## [0.2.1] - 2018-07-12
### Added
- Build client and server concurrently using `concurrently`
### Fixed
- Fix button component for absolute urls and pass rest props
### Changed
- Update packages

## [0.2.0] - 2018-07-11
### Changed
- Switch from `redux-first-router` to `redux-little-router`

## [0.1.2] - 2018-07-08
### Changed
- Update packages

## [0.1.1] - 2018-06-29
### Removed
- Remove custom `unique` helper because `webpack-flush-chunks` fixed the problem

## [0.1.0] - 2018-06-24
### Added
- Add changelog
### Changed
- Update packages

## [0.0.1] - 2018-06-16
### Added
- Initial release
