export const runValidations = async (validations, value) => {
    for (const validation of validations) {
        await validation(value);
    }
};