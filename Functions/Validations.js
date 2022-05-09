const validator = require('email-validator');
const { json } = require('express/lib/response');
const res = require('express/lib/response');

const personModel = require("../Models/Person/Person");

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

// export const login = (req,res) => {
    
// }

// function login(email,password){
//     if(!emailValidation(email)) return json({ error: "Email is not valid" });
    
//     var person = await personModel.findOne({ email: email});
//     if(!person) return 
// }

module.exports = { registerValidation, emailValidation };

