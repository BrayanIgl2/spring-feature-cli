import { Command } from 'commander';
import { runValidations } from '../utils/runValidations.js';
import { logger } from '../utils/logger.js';
import fs from 'fs';
import path from 'path';
import validations from '../validations/generateValidations.js';

const generate = new Command('generate');
const basePath = process.cwd();

generate
    .description('Create a new feature (entity, service, controller)')
    .alias('g')
    .argument('<featureName>')
    .action((featureName) => {
        try {
            const name = featureName?.trim();

            runValidations(validations, name);

            const structure = {
                entity: `${name}.java`,
                service: `${name}Service.java`,
                controller: `${name}Controller.java`,
            };


            Object.entries(structure).map(([folder, file]) => {
                const folderPath = path.join(basePath, name, folder);

                logger.info(`Creating ${folder}...`);
                fs.mkdirSync(folderPath, { recursive: true });
                fs.writeFileSync(path.join(folderPath, file), '');
            })


            logger.success(`\n` + 'Feature created successfully');
        } catch (error) {
            logger.error(error.message);
            process.exit(1);
        }

    });

export default generate;