import fs from 'fs';
import path from 'path';

const NotNullName = (name) => {
    if (!name) throw new Error('Feature name is required');
};

const minLengthName = (name) => {
    if (name.length < 3) throw new Error('Feature name must be at least 3 characters');
};

const alphabeticalName = (name) => {
    if (!name.match(/^[a-zA-Z]+$/)) throw new Error('Feature name must be alphabetical');
};


const featureExists = (name) => {
    const featurePath = path.join(process.cwd(), name);

    if (fs.existsSync(featurePath)) throw new Error('Feature already exists');
};

const validations = [
    NotNullName,
    minLengthName,
    alphabeticalName,
    featureExists
];

export default validations;