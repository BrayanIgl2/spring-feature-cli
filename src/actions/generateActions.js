import { runValidations } from '../utils/runValidations.js';
import { getMainClassDirectory, getRootPackage } from '../utils/javaPackageResolver.js'
import { logger } from '../utils/logger.js';
import { renderTemplate } from '../utils/templateCompiler.js'
import fs from 'fs';
import path from 'path';
import validations from '../validations/generateValidations.js';
import { fileURLToPath } from 'url';

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
    const templatesBasePath = path.join(__dirname, '..', 'templates');
    const template_context = { featureName, packageName };
    const structure = {
        domain: {
            featureName: `${featureName}.java`,
            templatePath: path.join(templatesBasePath, 'domain', 'Entity.hbs')
        },
        service: {
            featureName: `${featureName}Service.java`,
            templatePath: path.join(templatesBasePath, 'service', 'Service.hbs')


        },
        controller: {
            featureName: `${featureName}Controller.java`,
            templatePath: path.join(templatesBasePath, 'controller', 'Controller.hbs')


        },
        repository: {
            featureName: `${featureName}Repository.java`,
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
