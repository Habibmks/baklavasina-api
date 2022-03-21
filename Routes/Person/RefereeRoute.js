const express = require('express');

const router = express.Router();
const crypt = require('bcrypt');
const RefereeModel = require('../../Models/Person/Referee.js');

router.get('/all', async (req, res) => {
    const referees = await RefereeModel.find();
    return res.status(200).send(referees).end();
});

router.post('/add', async (req, res) => {
    console.log(req.body);
    const salt = await crypt.genSalt(10);
    const saltedpass = await crypt.hash(req.body.password.toString(), salt);

    const referee = new RefereeModel({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: saltedpass,
        token: req.body.token,
        comments: req.body.comment,
        matches: req.body.matches
    });
    console.log(referee);
    referee.save(function (error, resp) {
        if (error) {
            return res.send(error);
        } else {
            return res.status(200).send(resp);
            res.end();
        }
    });
});

router.post('/login', async (req, res) => {
    var referee = await RefereeModel.findOne({ email: req.body.email });
    if (!referee) return res.status(404).json({ error: "There is no user " + req.body.email });

    const passwordverification = await crypt.compare(req.body.password, referee.password);
    if (!passwordverification) return res.status(401).json({ error: "wrong password" });

    return res.json({
        email: referee.email,
        id: referee._id,
        name: referee.name,
        surname: referee.surname
    });
});

router.get('/get/:id', async (req, res) => {
    const id = req.params.id;
    var referee = await RefereeModel.findById(id);
    return res.send(referee);
});

router.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    const referee = req.body.RefereeModel;
    if(!referee) return res.status(404).json({error: "There is no user " + id});

    const salt = await crypt.genSalt(10);
    const saltedpass = await crypt.hash(req.body.password.toString(),salt);

    await RefereeModel.findByIdAndUpdate(id, {
        name: req.body.name,
        password: saltedpass,
    });
    return res.send(await RefereeModel.findById(id));
});

router.delete('/delete/:id', (req,res)=>{
    const id=req.params.id;
    RefereeModel.findByIdAndDelete(id).then((referee)=>{
        if(!referee){
            return res.status(404).send("There is no user" + id).end();
        }
        return res.status(200).json({referee,message: "User deleted succesfully"});
    }).catch((error)=>{
        return res.status(400).send(error).end();
    });
});

module.exports = router;