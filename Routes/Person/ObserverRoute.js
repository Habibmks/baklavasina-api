const express = require('express');

const router = express.Router();
const crypt = require('bcrypt');
const ObserverModel = require('../../Models/Person/Observer.js');

router.get('/all',(req,res)=>{
    const observers = await ObserverModel.find();
    return res.status(200).send(observers).end();
});


router.post('/add', async (req, res) => {
    console.log(req.body);
    const salt = await crypt.genSalt(10);
    const saltedpass = await crypt.hash(req.body.password.toString(), salt);

    const observer = new ObserverModel({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: saltedpass,
        token: req.body.token,
        comments: req.body.comment,
        matches: req.body.matches
    });
    console.log(observer);
    observer.save(function (error, resp) {
        if (error) {
            return res.send(error);
        } else {
            return res.status(200).send(resp);
            res.end();
        }
    });
});

router.post('/login', async (req, res) => {
    var observer = await ObserverModel.findOne({ email: req.body.email });
    if (!observer) return res.status(404).json({ error: "There is no user " + req.body.email });

    const passwordverification = await crypt.compare(req.body.password, observer.password);
    if (!passwordverification) return res.status(401).json({ error: "wrong password" });

    return res.json({
        email: observer.email,
        id: observer._id,
        name: observer.name,
        surname: observer.surname
    });
});

router.get('/get/:id', async (req, res) => {
    const id = req.params.id;
    var observer = await ObserverModel.findById(id);
    return res.send(observer);
});

router.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    const observer = req.body.ObserverModel;
    if(!observer) return res.status(404).json({error: "There is no user " + id});

    const salt = await crypt.genSalt(10);
    const saltedpass = await crypt.hash(req.body.password.toString(),salt);

    await ObserverModel.findByIdAndUpdate(id, {
        name: req.body.name,
        password: saltedpass,
    });
    return res.send(await ObserverModel.findById(id));
});

router.delete('/delete/:id', (req,res)=>{
    const id=req.params.id;
    ObserverModel.findByIdAndDelete(id).then((observer)=>{
        if(!observer){
            return res.status(404).send("There is no user" + id).end();
        }
        return res.status(200).json({observer,message: "User deleted succesfully"});
    }).catch((error)=>{
        return res.status(400).send(error).end();
    });
});

module.exports = router;