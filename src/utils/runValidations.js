export const runValidations = (validations, value) => {
    for (const validation of validations) {
        validation(value);
    }
};

export const chainRunValidations = (...validations) => (value) => {
    for (const validation of validations) {
        const result = validation(value);
        if(result !== true) return result;
    }
    return true;

}