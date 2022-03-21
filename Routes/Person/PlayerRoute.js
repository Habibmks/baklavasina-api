const express = require('express');
const router = express.Router();

const crypt = require('bcrypt');

const PlayerModel = require('../../Models/Person/Player')

router.get('/all', async (req,res)=>{
    const people = await PlayerModel.find();
    res.send(people);
});

router.post('/add', async (req, res) => {

    const salt = await crypt.genSalt(10);
    const saltedpass = await crypt.hash(req.body.password.toString(), salt);


    const player = new PlayerModel({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: saltedpass,
        token: req.body.token,
        contrats: req.body.contrats,
        team: req.body.teamId,
        transfers: req.body.transfers,
    });     
    console.log(player);
    player.save(function (error, resp) {
        if (error) {
            return res.send(error);
        } else {
            return res.status(200).send(resp);
            res.end("domates");
        }
    });

});

router.post('/login', async (req, res) => {
    var player = await PlayerModel.findOne({ email: req.body.email });
    if (!player) return res.status(404).json({ error: "There is no user " + req.body.email });

    const passwordverification = await crypt.compare(req.body.password, player.password);
    if (!passwordverification) return res.status(401).json({ error: "wrong password" });


    return res.json({
        email: player.email,
        id: player._id,
        name: player.name,
        surname: player.surname
    });
});

router.get('/get/:id', async (req, res) => {
    const id = req.params.id;
    var player = await PlayerModel.findById(id);
    res.send(player);
});

router.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    const player = req.body.PlayerModel;
    await PlayerModel.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        password: req.body.password
    });
    res.send(await PlayerModel.findById(id));
    PlayerModel.findOne('email', req.body.email);

});

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    PlayerModel.findByIdAndDelete(id).then((player) => {
        if (!player) {
            return res.status(404).end('There is no user').end;
        }
        return res.status(200).json({player, message: "User deleted succesfully"}).end;
    }).catch((error) => {
        return res.status(400).send(error).end();
    });
});

module.exports = router;