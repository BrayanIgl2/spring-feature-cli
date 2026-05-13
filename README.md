# spring-feature-cli

`spring-feature-cli` is a personal project to learn how to build command-line tools with Node.js. It is designed to generate basic Spring Boot artifacts using a feature-based structure and clean architecture principles.

## Purpose

- Learn Node.js and the CLI ecosystem
- Practice using `commander`, `inquirer`, and `handlebars`
- Automate repetitive code generation for Spring Boot projects
- Generate entities, services, repositories, and controllers with a simple workflow

## Features

- Executable CLI via the `spfc` command
- Template generation using `handlebars`
- Input validation and project detection
- Supports generating:
  - `Entity`
  - `Repository`
  - `Service`
  - `Controller`

## Installation

```bash
npm install
```

To install globally (optional):

```bash
npm install -g .
```

## Usage

Run the tool from the project directory:

```bash
spfc generate
```

Or in development mode:

```bash
npm run dev
```

## Project Structure

- `bin/index.js`: executable CLI entry point
- `src/index.js`: main CLI logic
- `src/commands/generate.js`: generate command
- `src/actions/generateActions.js`: file creation actions
- `src/validations/generateValidations.js`: input validations
- `src/utils/`: utilities for Java package resolution, project scanning, and template compilation
- `src/templates/`: Handlebars templates for generated artifacts

## Key Dependencies

- `commander` for defining CLI commands
- `inquirer` for interactive prompts
- `handlebars` for template generation
- `chalk` for console styling

## License

This project is licensed under `MIT`.
