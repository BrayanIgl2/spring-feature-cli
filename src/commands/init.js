import { Command } from 'commander';
import { logger } from '../utils/logger.js';
import { initFeature } from '../actions/initActions.js';

const init = new Command('init');

init
    .description()
    .alias()
    .action(async () => {
        try {

        } catch (error) {
            logger.error(error.message);
            process.exit(1);
        }
    });

export default init;