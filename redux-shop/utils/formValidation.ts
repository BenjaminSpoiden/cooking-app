export const validateName = (value: string) => {
    if (!value) {
        return "Name is required";
    } else if (value.length < 3) {
        return "Please enter a name with more than 3 characters";
    } else return true;
}

export const validatePassword = (value: string) => {
    if (!value) {
        return "Password is required";
    } else if (value.length < 8) {
        return "Please enter a password with minimun 8 characters";
    } else return true;
}

export const validateEmail = (value: string) => {
    if(!value) {
        return "Email is required"
    } else return true
}
