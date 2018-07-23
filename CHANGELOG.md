# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

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