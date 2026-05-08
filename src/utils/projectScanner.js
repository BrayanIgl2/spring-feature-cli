import fs from 'fs';
import path from 'path';

export function getJavaPath() {
    const rootPath = findProjectRoot();
    return path.join(rootPath, 'src', 'main', 'java');
}


function findProjectRoot(start = process.cwd()) {
    let current = start;

    while (current !== path.dirname(current)) {
        if (isSpringProject(current)) return current;
        current = path.dirname(current);
    }
    throw new Error('Project Home not found');
}


function isSpringProject(projectPath) {
    const pomPath = path.join(projectPath, 'pom.xml');

    if (!fs.existsSync(pomPath)) return false;

    const pomContent = fs.readFileSync(pomPath, 'utf-8');
    return pomContent.includes('spring-boot-starter');

}