import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import { select, input, password, confirm } from '@inquirer/prompts';

import { renderTemplate } from '../utils/templateCompiler.js';
import { getPropertiesFile } from '../utils/projectScanner.js';
import { chainRunValidations } from '../utils/runValidations.js'
import { notEmpty, minLength, validDbName } from '../validations/initValidations.js';
import { db_engines } from '../config/db_engines.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function initFeature() {
    const file = getPropertiesFile();
    const template_context = await wizard();
    
    if(!template_context) return;

    const template_path = path.join(__dirname, '..', 'templates', 'configuration', 'spring', 'application.properties.hbs');
    const content = renderTemplate(template_path, template_context);
    fs.writeFileSync(file, content);
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
    const ddl = await select({
        message: 'DDL auto strategy',
        choices: [
            { name: 'create', value: 'create' },
            { name: 'update', value: 'update' },
            { name: 'validate', value: 'validate' },
            { name: 'none', value: 'none' }
        ]
    })
    const engine_context = db_engines[engine];

    const db_name = await input({
        message: 'Database name: ',
        validate: chainRunValidations(notEmpty, minLength(3), validDbName)
    });

    const username = await input({
        message: 'Username: ',
        validate: chainRunValidations(notEmpty)
    });

    const psswd = await password({
        message: 'Password: ',
        validate: engine === 'h2' ? undefined : notEmpty

    })


    console.log(`\n ${chalk.cyan('Configuration summary')}`)
    console.log(`${chalk.dim('Engine: ')} ${engine}`)
    console.log(`${chalk.dim('DDL auto Strategy: ')} ${ddl}`)
    console.log(`${chalk.dim('Database name: ')} ${db_name}`)
    console.log(`${chalk.dim('username: ')} ${username}`)
    console.log(`${chalk.dim('password: ')} ${'*'.repeat(psswd.length)} \n `)

    const proceed = await confirm({
        message: chalk.yellowBright('This will overwrite the current application.properties. Proceed?')
    })
    if (proceed) {
        const context = {
            ...engine_context, ddl, db_name, username, password: psswd,
        }
        return context;
    }
    console.log(chalk.red("Cancelled"));
}