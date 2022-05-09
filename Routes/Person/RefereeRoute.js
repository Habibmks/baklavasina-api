const express = require('express');

const router = express.Router();
const crypt = require('bcrypt');
const personModel = require('../../Models/Person/Person.js');
const v = require('../../Functions/Validations.js');

router.get('/all', async (req, res) => {
    const people = await personModel.find();
    return res.status(200).send(people).end();
});

router.post('/register', async (req, res) => {

    var name = req.body.name;
    var surname = req.body.surname;
    var email = req.body.email;
    var password = req.body.password;
    var type = {
        referee: true,
    };

    /*var person = await personModel.findOne({ email: email });
    if(person){
        res.status(409).json({ error: "Already registered", }).end();
    }*/
    if (v.registerValidation(name, surname, email, password) == null) {
        const salt = await crypt.genSalt(10);
        const saltedpass = await crypt.hash(req.body.password.toString(), salt);
        const newperson = new personModel({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: saltedpass,
            type: type,
        });
        newperson.save(function (error, resp) {
            if (error) {
                return res.send(error);
            } else {
                return res.status(200).json({
                    name: name,
                    surname: surname,
                    email: email,
                });
                res.end();
            }
        });
    }
    else return res.json({ error: v.registerValidation(name, surname, email, password) });


});

router.post('/login', async (req, res) => {
    email = req.body.email;
    password = req.body.password;
    if (!v.emailValidation(email)) return res.json({
        error: "Email is not valid",
    });
    var person = await personModel.findOne({ email: email });

    if (!person) return res.status(404).json({ error: "There is no user " + email });

    if (!(await crypt.compare(req.body.password, person.password))) return res.status(401).json({ error: "wrong password" });
    if (person.type.referee != true) {
        return res.json({
            error: "User is not referee",
        });
    };

    return res.status(201).json({
        email: person.email,
        id: person._id,
        name: person.name,
        surname: person.surname
    });
});

router.get('/get/:id', async (req, res) => {
    const id = req.params.id;
    if (id.length != 24) return res.json({
        error: "Invalid id",
    });
    const person = await personModel.findById(id);
    if (!person) return res.status(404).json({
        error: "There is no user with " + id,
    });
    return res.json({
        name: person.name,
        surname: person.surname,
        email: person.email,
        registerDate: person.date,
        refereeRating: person.refereeRating,
        refereeComments: person.refereeComments,
        refereeMatches: person.refereeMatches,
        adress: person.adress,
    });
});

router.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    if (id.length != 24) return res.json({
        error: "Invalid id",
    });
    const person = req.body.personModel;
    if (!person) return res.status(404).json({
        error: "There is no user " + id
    });

    if (!(await crypt.compare(req.body.password, person.password))) return res.status(401).json({ error: "wrong password" });

    const salt = await crypt.genSalt(10);
    const saltedpass = await crypt.hash(req.body.password.toString(), salt);

    await personModel.findByIdAndUpdate(id, {
        name: req.body.name,
        surname: req.body.surname,
        password: saltedpass,
    });
    return res.send(await personModel.findById(id));
});

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    if (id.length != 24) return res.json({
        error: "Invalid id",
    });
    personModel.findByIdAndDelete(id).then((person) => {
        if (!person) {
            return res.status(404).send("There is no user" + id).end();
        }
        return res.status(200).json({ person, message: "User deleted succesfully" });
    }).catch((error) => {
        return res.status(400).send(error).end();
    });
});
router.get('')
module.exports = router;