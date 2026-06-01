import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import validations from '../validations/generateValidations.js';
import { runValidations } from '../utils/runValidations.js';
import { getMainClassDirectory, getRootPackage } from '../utils/javaPackageResolver.js';
import { logger } from '../utils/logger.js';
import { renderTemplate } from '../utils/templateCompiler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function generateFeature(featureName) {
    const javaPath = getMainClassDirectory();
    const packageName = getRootPackage();

    const input_context = { featureName, javaPath, packageName };

    runValidations(validations, featureName);

    generateFeatureStructure(input_context)
    logger.success(`\n` + 'Feature created successfully');
}

function generateFeatureStructure({ featureName, javaPath, packageName }) {
    const capitalizedName = featureName.charAt(0).toUpperCase() + featureName.slice(1).toLowerCase();
    const templatesBasePath = path.join(__dirname, '..', 'templates');
    const template_context = { featureName, packageName, capitalizedName };
    
    const structure = {
        domain: {
            featureName: `${capitalizedName}.java`,
            templatePath: path.join(templatesBasePath, 'domain', 'Entity.hbs')
        },
        service: {
            featureName: `${capitalizedName}Service.java`,
            templatePath: path.join(templatesBasePath, 'service', 'Service.hbs')
        },
        controller: {
            featureName: `${capitalizedName}Controller.java`,
            templatePath: path.join(templatesBasePath, 'controller', 'Controller.hbs')
        },
        repository: {
            featureName: `${capitalizedName}Repository.java`,
            templatePath: path.join(templatesBasePath, 'repository', 'Repository.hbs')
        }
    };

    for (const [folder, file] of Object.entries(structure)) {
        const folderPath = path.join(javaPath, featureName, folder);

        logger.info(`Creating ${folder}...`);
        fs.mkdirSync(folderPath, { recursive: true });

        const content = renderTemplate(file.templatePath, template_context);
        fs.writeFileSync(path.join(folderPath, file.featureName), content);
    }
}
