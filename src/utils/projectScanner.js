import fs from 'fs';
import path from 'path';

export function getJavaPath() {
    const rootPath = findProjectRoot();
    if (!isSpringProject(rootPath)) throw new Error('Project is not a Spring Boot project');

    return path.join(rootPath, 'src', 'main', 'java');
}


function findProjectRoot(start = process.cwd()) {
    let current = start;

    while (current !== path.dirname(current)) {
        const pomExists = fs.existsSync(path.join(current, 'pom.xml'));
        const srcExists = fs.existsSync(path.join(current, 'src', 'main', 'java'));
        if (pomExists && srcExists) return current;
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