export const notEmpty = (value) => {
    if (!value || value.trim() === '') return 'This field is required';
    return true;
};

export const validDbName = (value) => {
    if (!value.match(/^[a-zA-Z0-9_]+$/)) return 'Only letters, numbers and underscores are allowed';
    return true;
};

export const minLength = (min) => (value) => {
    if (value.trim().length < min) return `Must be at least ${min} characters`;
    return true;
};
