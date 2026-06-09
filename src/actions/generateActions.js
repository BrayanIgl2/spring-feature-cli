import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import validations from '../validations/generateValidations.js';
import { runValidations } from '../utils/runValidations.js';
import { getMainClassDirectory, getRootPackage } from '../utils/javaPackageResolver.js';
import { logger } from '../utils/logger.js';
import { renderTemplate } from '../utils/templateCompiler.js';
import { structure } from '../config/architectures/featureBased.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function generateFeature(featureName) {
    const javaPath = getMainClassDirectory();
    const packageName = getRootPackage();

    const inputContext = { featureName, javaPath, packageName };

    runValidations(validations, featureName);

    generateFeatureStructure(inputContext)
    logger.success(`\n` + 'Feature created successfully');
}

function generateFeatureStructure({ featureName, javaPath, packageName }) {
    const capitalizedName = featureName.charAt(0).toUpperCase() + featureName.slice(1).toLowerCase();
    const templatesBasePath = path.join(__dirname, '..', 'templates', 'feature');
    const templateContext = { featureName, packageName, capitalizedName };

    for (const [folder, file] of Object.entries(structure)) {
        const folderPath = path.join(javaPath, file.folder(featureName), folder);

        const fullPath = path.join(templatesBasePath,file.templatePath);
        const fileName = file.featureName(capitalizedName);
        logger.info(`Creating ${folder}...`);
        fs.mkdirSync(folderPath, { recursive: true });

        const content = renderTemplate(fullPath, templateContext);
        fs.writeFileSync(path.join(folderPath, fileName), content);
    }
}
