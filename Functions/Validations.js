const validator = require('email-validator');

function registerValidation(name, surname, email, password) {
    if (!name) return "Name can not be null";
    else if (!surname) return "Surname can not be null";
    else if (!email) return "Email can not be null";
    else if (!password) return "Password can not be null";
    if (!validator.validate(email)) return "Email is not valid";
    if (password.length <= 8) return "Password must be longer than 8 characters";
    return null;
}

function emailValidation(email) {
    return validator.validate(email);
}
module.exports = { registerValidation, emailValidation };