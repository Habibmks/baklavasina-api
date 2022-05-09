const express = require('express');
const router = express.Router();

const crypt = require('bcrypt');
const v = require('../../Functions/Validations.js');

//import { register , getAll , login } from '../../Functions/Person.js';
const { getAll , login, register } = require( '../../Functions/Person.js');

router.get('/all', getAll);

router.post('/register', register);

router.post('/login', login);

router.get('/get/:id', async (req, res) => {
    const id = req.params.id;
    if(id.length != 24) return res.json({ error: "Invalid id"});
    const person = await personModel.findById(id);
    if(!person) return res.status(404).json({ error: "There is no user with " + id });
    return res.status(200).json({
        name: person.name,
        surname: person.surname,
        email: person.email,
        uniformNo: person.uniformNo,
        contrats: person.contrats,
        team: person.team,
        transfers: person.transfers,
        pPower: person.pPower,
        adress: person.adress,
    });
});

router.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    const person = req.body.personModel;
    await personModel.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        password: req.body.password
    });
    res.send(await personModel.findById(id));
    personModel.findOne('email', req.body.email);
});

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    personModel.findByIdAndDelete(id).then((person) => {
        if (!person) {
            return res.status(404).end('There is no user').end;
        }
        return res.status(200).json({ person, message: "User deleted succesfully" }).end;
    }).catch((error) => {
        return res.status(400).send(error).end();
    });
});

module.exports = router;