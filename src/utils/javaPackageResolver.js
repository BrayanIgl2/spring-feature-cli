import { getMainClassFile } from '../utils/projectScanner.js';
import fs from 'fs';
import path from 'path';

export function getMainClassDirectory() {
return path.dirname(getMainClassFile());
}