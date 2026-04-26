export const runValidations = async (validations, value) => {
    for (const validation of validations) {
        const error = await validation(value);
        if (error) return error;
    }
    return null;
};