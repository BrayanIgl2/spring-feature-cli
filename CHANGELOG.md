## [0.4.0] - 10-06-2026
### Added
- `LICENSE` file (MIT)
- Repository metadata in `package.json` (`repository`, `author`, `homepage`, `bugs`, `engines`)
- README overhaul: problem-first description, badges and usage docs

### Fixed
- Declared `@inquirer/prompts` as a direct dependency (was resolving as a phantom dependency through `inquirer`)

### Changed
- Minimum supported Node.js version raised to 20.17 (required by `@inquirer/prompts` v8)

### Removed
- Unused `inquirer` package from dependencies
- Deprecated `hibernate.dialect` property from the `application.properties` template (auto-detected since Hibernate 6)

### Refactored
- Renamed internal variables for consistency

---

## [0.3.2] - 08-06-2026
### Fixed
- `validate` option for H2 password prompt now passes `undefined` instead of `true`
- Template no longer renders when wizard is cancelled (null guard in `initFeature`)
- "Configuration resume" corrected to "Configuration summary"
- Package description updated to English

### Refactored
- Feature layer structure moved to `src/config/architectures/featureBased.js`

## [0.3.0] - 07-06-2026
### Added
- `init` command: interactive wizard to generate `application.properties`
- Dynamic version reading from `package.json`