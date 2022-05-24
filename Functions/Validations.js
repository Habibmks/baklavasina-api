const validator = require('email-validator');
const { json } = require('express/lib/response');
const res = require('express/lib/response');

const personModel = require("../Models/Person/Person");

function registerValidation(name, surname) {
    if (!name) return "Name can not be null";
    else if (!surname) return "Surname can not be null";
    return null;
}


// export const login = (req,res) => {
    
// }

// function login(email,password){
//     if(!emailValidation(email)) return json({ error: "Email is not valid" });
    
//     var person = await personModel.findOne({ email: email});
//     if(!person) return 
// }

module.exports = { registerValidation };

