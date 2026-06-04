import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import { select, input, password, confirm } from '@inquirer/prompts';

import { runValidations } from '../utils/runValidations.js';
import { renderTemplate } from '../utils/templateCompiler.js';
import { getPropertiesFile } from '../utils/projectScanner.js'
import { db_engines } from '../config/db_engines.js';
import validations from '../validations/initValidations.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function initFeature() {
   const template_context =  await wizard();
   
}
async function wizard() {
    const engine = await select({
        message: 'Select database engine',
        choices: [
            { name: 'PostgreSQL', value: 'postgresql' },
            { name: 'MySQL', value: 'mysql' },
            { name: 'H2', value: 'h2' }
        ]
    });

    const db_name = await input({
        message: 'Database name: '
    });

    const username = await input({
        message: 'Username: '
    });

    const psswd = await password({
        message: 'Password: '
    })

    console.log(`\n ${chalk.cyan('Configuration resume')}`)
    console.log(`${chalk.dim('Engine: ')} ${engine}`)
    console.log(`${chalk.dim('Database name: ')} ${db_name}`)
    console.log(`${chalk.dim('username: ')} ${username}`)
    console.log(`${chalk.dim('password: ')} ${'*'.repeat(psswd.length)} \n `)

    const proceed = await confirm({
        message: 'This will overwrite the current application.properties. Proceed?'
    })
}