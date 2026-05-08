import { runValidations } from '../utils/runValidations.js';
import { getMainClassDirectory } from '../utils/javaPackageResolver.js'
import { logger } from '../utils/logger.js';
import fs from 'fs';
import path from 'path';
import validations from '../validations/generateValidations.js';

export function generateFeature(name) {
    const javaPath = getMainClassDirectory();
    const context = { name, javaPath };
    runValidations(validations, name);

    generateFeatureStructure(context)
    logger.success(`\n` + 'Feature created successfully');
}

function generateFeatureStructure({ name, javaPath }) {
    const structure = {
        domain: `${name}.java`,
        service: `${name}Service.java`,
        controller: `${name}Controller.java`,
    };

    for (const [folder, file] of Object.entries(structure)) {
        const folderPath = path.join(javaPath, name, folder);

        logger.info(`Creating ${folder}...`);
        fs.mkdirSync(folderPath, { recursive: true });
        fs.writeFileSync(path.join(folderPath, file), '');
    }
}
