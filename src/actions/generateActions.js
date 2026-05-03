
import { runValidations } from '../utils/runValidations.js';
import { logger } from '../utils/logger.js';
import { scanProjectPath } from '../utils/projectScanner.js';
import fs from 'fs';
import path from 'path';
import validations from '../validations/generateValidations.js';

export function generateFeature(name) {

    const basePath = process.cwd();

    scanProjectPath();
    runValidations(validations, name);

    const structure = {
        entity: `${name}.java`,
        service: `${name}Service.java`,
        controller: `${name}Controller.java`,
    };

    for (const [folder, file] of Object.entries(structure)) {
        const folderPath = path.join(basePath, name, folder);

        logger.info(`Creating ${folder}...`);
        fs.mkdirSync(folderPath, { recursive: true });
        fs.writeFileSync(path.join(folderPath, file), '');
    }

    logger.success(`\n` + 'Feature created successfully');


}
