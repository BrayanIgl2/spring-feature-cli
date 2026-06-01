
import { Command } from 'commander';
import generateCommand from './commands/generate.js';
import initCommand from './commands/init.js';

const program = new Command();

program
    .name('spring-feature-cli')
    .description('CLI tool to generate feature-based structure for Spring Boot applications, including entities, services and controllers, following clean architecture principles.')
    .version('0.2.2');

program.addCommand(generateCommand);
program.addCommand(initCommand);
program.parse();