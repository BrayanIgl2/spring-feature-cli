# spring-feature-cli

[![npm version](https://img.shields.io/npm/v/spring-feature-cli.svg)](https://www.npmjs.com/package/spring-feature-cli)
[![license](https://img.shields.io/npm/l/spring-feature-cli.svg)](./LICENSE)
[![node](https://img.shields.io/badge/node-%3E%3D20.17-brightgreen.svg)](https://nodejs.org)

`spring-feature-cli` (`spfc`) generates complete, feature-based vertical slices — entity, repository, service and controller — with consistent naming and package structure, in a single command. It can also configure your `application.properties` through an interactive wizard.

## Why

Every new feature in a Spring Boot project starts the same way: create four files across four packages, wire up the same imports, repeat the same naming conventions. Doing it by hand is slow and error-prone; copying from an existing feature drags leftover code along. `spfc` automates that first step so every feature starts clean and consistent.

## Installation

```bash
npm install -g spring-feature-cli
```

## Usage

### Generate a feature

Run inside your Spring Boot project:

```bash
spfc generate user
# or
spfc g user
```

The CLI detects your root package automatically (from the class annotated with `@SpringBootApplication`) and generates:

```
src/main/java/com/example/app/
└── user/
    ├── controller/UserController.java
    ├── domain/User.java
    ├── repository/UserRepository.java
    └── service/UserService.java
```

- **`User`** — JPA entity with an auto-generated `Long` id
- **`UserRepository`** — Spring Data `JpaRepository`
- **`UserService`** — `@Service` stub ready to fill in
- **`UserController`** — `@RestController` mapped to `/api/user`

### Configure application.properties

```bash
spfc init
# or
spfc i
```

Launches an interactive wizard that asks for:

- Database engine (PostgreSQL, MySQL or H2)
- Hibernate `ddl-auto` strategy (`create`, `update`, `validate`, `none`)
- Database name, username and password

It shows a configuration summary, asks for confirmation, and writes `src/main/resources/application.properties` with the datasource, JPA/Hibernate and SQL-logging settings. The existing file is only overwritten after explicit confirmation.

## How it works

1. Walks up from the current directory until it finds a `pom.xml` containing `spring-boot-starter` (project root detection).
2. Locates the `@SpringBootApplication` class and reads its `package` declaration to resolve the root package.
3. Renders Handlebars templates with the feature and package context, and writes the files following a feature-based (vertical slice) structure.

## Requirements

- Node.js >= 20.17
- A Maven-based Spring Boot project (`pom.xml` with `spring-boot-starter`)

## Project structure

```
bin/index.js        → CLI entry point
src/commands/       → Command definitions (commander)
src/actions/        → Generation and wizard logic
src/validations/    → Input validation layer
src/utils/          → Project scanning, package resolution, template rendering, logging
src/templates/      → Handlebars templates for the generated code
src/config/         → Architecture layouts and DB engine presets
```

Built with [commander](https://www.npmjs.com/package/commander), [@inquirer/prompts](https://www.npmjs.com/package/@inquirer/prompts), [handlebars](https://www.npmjs.com/package/handlebars) and [chalk](https://www.npmjs.com/package/chalk).

## License

[MIT](./LICENSE)