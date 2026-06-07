
import { Command } from 'commander';
import generateCommand from './commands/generate.js';
import initCommand from './commands/init.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { version } = require('../package.json');

const program = new Command();

program
    .name('spring-feature-cli')
    .description('CLI tool to generate feature-based structure for Spring Boot applications, including entities, services and controllers, following clean architecture principles.')
    .version(version);

program.addCommand(generateCommand);
program.addCommand(initCommand);
program.parse();