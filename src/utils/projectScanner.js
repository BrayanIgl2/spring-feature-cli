import fs from 'fs';
import path from 'path';

export function getMainClassFile() {
    const rootPath = findProjectRoot();
    let current = path.join(rootPath, 'src', 'main', 'java');

    const FilePath = searchInDirectory(current);
    if(!FilePath) throw new Error('@SpringBootApplication not found');
    return searchInDirectory(current);

}

function searchInDirectory(DirectoryPath) {
    const files = fs.readdirSync(DirectoryPath);

    for (const file of files) {
        const filePath = path.join(DirectoryPath, file)
        const stats = fs.statSync(filePath);

        if (stats.isFile() && file.endsWith(".java")) {
            const content = fs.readFileSync(filePath, 'utf-8');

            if (content.includes('@SpringBootApplication')) {
                return filePath;
            }
        } else if (stats.isDirectory()) {
            const result = searchInDirectory(filePath);
            if (result) return result;

        }
    }
    return null;
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