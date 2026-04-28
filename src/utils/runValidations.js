export const runValidations = (validations, value) => {
    for (const validation of validations) {
        validation(value);
    }
};