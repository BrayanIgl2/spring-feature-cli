import { Command } from 'commander';
import fs from 'fs/promises';
import path from 'path';
import validations from '../validations/generateValidations.js';
import { runValidations } from '../utils/runValidations.js';

const generate = new Command('generate');
const basePath = process.cwd();

generate
    .description('Create a new feature (entity, service, controller)')
    .alias('g')
    .argument('<featureName>')
    .action(async (featureName) => {
        try {
            const name = featureName?.trim();

            await runValidations(validations, name);

            const structure = {
                entity: `${name}.java`,
                service: `${name}Service.java`,
                controller: `${name}Controller.java`,
            };

            await Promise.all(
                Object.entries(structure).map(async ([folder, file]) => {
                    const folderPath = path.join(basePath, name, folder);

                    await fs.mkdir(folderPath, { recursive: true });
                    await fs.writeFile(path.join(folderPath, file), '');
                })
            )

            console.log('Feature created successfully');
        } catch (error) {
            console.error(error.message);
            process.exit(1);
        }

    });

export default generate;