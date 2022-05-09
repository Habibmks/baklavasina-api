const express = require('express');

const router = express.Router();
const crypt = require('bcrypt');
const ObserverModel = require('../../Models/Person/Observer.js');
const personModel = require('../../Models/Person/Person.js');


router.get('/all',(req,res)=>{
    const people = await personModel.find();
    return res.status(200).send(people).end();
});


router.post('/add', async (req, res) => {
    console.log(req.body);
    const salt = await crypt.genSalt(10);
    const saltedpass = await crypt.hash(req.body.password.toString(), salt);

    const person = new personModel({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: saltedpass,
        token: req.body.token,
        comments: req.body.comment,
        matches: req.body.matches
    });
    console.log(person);
    person.save(function (error, resp) {
        if (error) {
            return res.send(error);
        } else {
            return res.status(200).send(resp);
            res.end();
        }
    });
});

router.post('/login', async (req, res) => {
    var person = await personModel.findOne({ email: req.body.email });
    if (!person) return res.status(404).json({ error: "There is no user " + req.body.email });

    const passwordverification = await crypt.compare(req.body.password, person.password);
    if (!passwordverification) return res.status(401).json({ error: "wrong password" });

    return res.json({
        email: person.email,
        id: person._id,
        name: person.name,
        surname: person.surname
    });
});

router.get('/get/:id', async (req, res) => {
    const id = req.params.id;
    var person = await personModel.findById(id);
    return res.send(person);
});

router.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    const person = req.body.personModel;
    if(!person) return res.status(404).json({error: "There is no user " + id});

    const salt = await crypt.genSalt(10);
    const saltedpass = await crypt.hash(req.body.password.toString(),salt);

    await personModel.findByIdAndUpdate(id, {
        name: req.body.name,
        password: saltedpass,
    });
    return res.send(await personModel.findById(id));
});

router.delete('/delete/:id', (req,res)=>{
    const id=req.params.id;
    personModel.findByIdAndDelete(id).then((person)=>{
        if(!person){
            return res.status(404).send("There is no user" + id).end();
        }
        return res.status(200).json({person,message: "User deleted succesfully"});
    }).catch((error)=>{
        return res.status(400).send(error).end();
    });
});

module.exports = router;