## [0.3.2] - 2026-06-08
### Fixed
- `validate` option for H2 password prompt now passes `undefined` instead of `true`
- Template no longer renders when wizard is cancelled (null guard in `initFeature`)
- "Configuration resume" corrected to "Configuration summary"
- Package description updated to English

### Refactored
- Feature layer structure moved to `src/config/architectures/featureBased.js`

## [0.3.0] - 2026-06-07
### Added
- `init` command: interactive wizard to generate `application.properties`
- Dynamic version reading from `package.json`

