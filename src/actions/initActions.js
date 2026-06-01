import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { runValidations } from '../utils/runValidations.js';
import { renderTemplate } from '../utils/templateCompiler.js';
import {getPropertiesFile} from '../utils/projectScanner.js'
//import validations from '../validations/initValidations.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export async function initFeature(){
}