export const structure = {
    domain: {
        featureName: (name) => `${name}.java`,
        templatePath: 'domain/Entity.hbs'
    },
    service: {
        featureName: (name) => `${name}Service.java`,
        templatePath: 'service/Service.hbs'
    },
    controller: {
        featureName: (name) => `${name}Controller.java`,
        templatePath: 'controller/Controller.hbs'
    },
    repository: {
        featureName: (name) => `${name}Repository.java`,
        templatePath: 'repository/Repository.hbs'
    }
};