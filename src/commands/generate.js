import { Command } from 'commander';
import { generateFeature } from '../actions/generateActions.js';
import { logger } from '../utils/logger.js';

const generate = new Command('generate');


generate
    .description('Create a new feature (entity, service, controller)')
    .alias('g')
    .argument('<featureName>')
    .action((featureName) => {
        try {

            const name = featureName?.trim();
            generateFeature(name);

        } catch (error) {
            logger.error(error.message);
            process.exit(1);
        }
    });

export default generate;