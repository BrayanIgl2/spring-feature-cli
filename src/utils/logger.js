import chalk from 'chalk';

export const logger = {
    success: (msg) => console.log(`\n` + chalk.green(`${msg}`)),
    error: (msg) => console.error(`\n` + chalk.red(`${msg}`)),
    info: (msg) => console.log(chalk.cyan(`${msg}`)),
    warn: (msg) => console.log(chalk.yellow(`${msg}`)),
};