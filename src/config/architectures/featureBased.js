const folderName = (name) => name;

export const structure = {
    domain: {
        featureName: (capitalizedName) => `${capitalizedName}.java`,
        folder: folderName,
        templatePath: 'domain/Entity.hbs',
    },
    service: {
        featureName: (name) => `${name}Service.java`,
        folder: folderName,
        templatePath: 'service/Service.hbs'
    },
    controller: {
        featureName: (name) => `${name}Controller.java`,
        folder: folderName,
        templatePath: 'controller/Controller.hbs'
    },
    repository: {
        featureName: (name) => `${name}Repository.java`,
        folder: folderName,
        templatePath: 'repository/Repository.hbs'
    }
};