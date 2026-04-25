import { Command } from 'commander';
import fs from 'fs/promises';
import path from 'path';

const generate = new Command('generate');
const basePath = process.cwd();

generate
    .description('Create a new feature (entity, service, controller)')
    .alias('g')
    .argument('<featureName>')
    .action(async (featureName) => {
        const pluralName = featureName + 's';

        const structure = {
            entity: `${featureName}.java`,
            service: `${featureName}Service.java`,
            controller: `${featureName}Controller.java`,
        };

        await Promise.all(
            Object.entries(structure).map(async ([folder, file]) => {
                const folderPath = path.join(basePath, pluralName, folder);

                await fs.mkdir(folderPath, { recursive: true });
                await fs.writeFile(path.join(folderPath, file), '');
            })
        )

    });

export default generate;