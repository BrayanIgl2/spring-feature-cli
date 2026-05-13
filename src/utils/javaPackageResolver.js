import { getMainClassFile } from '../utils/projectScanner.js';
import fs from 'fs';
import path from 'path';

export function getMainClassDirectory() {
    return path.dirname(getMainClassFile());
}

export function getRootPackage() {
    const file = getMainClassFile();
    const content = fs.readFileSync(file, 'utf-8');

    const packageLine = content.split('\n').find(line => line.trim().startsWith('package'));

    if (!packageLine) throw new Error("Root Package not found");

    return packageLine.replace('package', '').replace(';', '').trim();
}