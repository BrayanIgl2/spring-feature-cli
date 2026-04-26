import fs from 'fs/promises';
import path from 'path';
const NotNullName = (name) => {
    if (!name) return 'Feature name is required';
    return null;
};

const minLengthName = (name) => {
    if (name.length < 3) return 'Feature name must be at least 3 characters';
    return null;
};

const alphabeticalName = (name) => {
    if (!name.match(/^[a-zA-Z]+$/)) return 'Feature name must be alphabetical';
    return null;
};

export const featureDoesNotExist = async (name) => {
    const featurePath = path.join(process.cwd(), name);

    try {
        await fs.stat(featurePath);
        return 'Feature already exists';
    } catch (err) {
        if (err.code === 'ENOENT') return null;

        return 'Unable to check feature existence';
    }
};

const validations = [
    NotNullName,
    minLengthName,
    alphabeticalName,
    featureDoesNotExist
];

export default validations;