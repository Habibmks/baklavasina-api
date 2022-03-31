const express = require('express');
const router = express.Router();

const crypt = require('bcrypt');
const v = require('../../Functions/Validations.js');
const PlayerModel = require('../../Models/Person/Player.js');

router.get('/all', async (req, res) => {
    const players = await PlayerModel.find();
    res.send(players);
});

router.post('/register', async (req, res) => {
    var name = req.body.name;
    var surname = req.body.surname;
    var email = req.body.email;
    var password = req.body.password;
    var type = {
        player: true,
    };

    if (v.registerValidation(name, surname, email, password) == null) {
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
            type: type,
        });
        player.save(function (error, resp) {
            if (error) {
                return res.send(error);
            } else {
                return res.status(200).send(resp);
                res.end("domates");
            }
        });
    } else return res.json({ error: v.registerValidation(name, surname, email, password) });


});

router.post('/login', async (req, res) => {
    email = req.body.email;
    password = req.body.email;
    if (!v.emailValidation(email)) return res.json({ error: "Email is not valid" });

    var player = await PlayerModel.findOne({ email: req.body.email });
    if (!player) return res.status(404).json({ error: "There is no user " + req.body.email });

    if (!(await crypt.compare(req.body.password, player.password))) return res.status(401).json({ error: "wrong password" });

    if(player.type.player != true) 
        return res.json({ error: 'User is not player'});
    return res.status(201).json({
        email: player.email,
        id: player._id,
        name: player.name,
        surname: player.surname
    });
});

router.get('/get/:id', async (req, res) => {
    const id = req.params.id;
    if(id.length != 24) return res.json({ error: "Invalid id"});
    const player = await PlayerModel.findById(id);
    if(!player) return res.status(404).json({ error: "There is no user with " + id });
    return res.status(200).json({
        name: player.name,
        surname: player.surname,
        email: player.email,
        uniformNo: player.uniformNo,
        contrats: player.contrats,
        team: player.team,
        transfers: player.transfers,
        pPower: player.pPower,
        adress: player.adress,
    })
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
        return res.status(200).json({ player, message: "User deleted succesfully" }).end;
    }).catch((error) => {
        return res.status(400).send(error).end();
    });
});

module.exports = router;