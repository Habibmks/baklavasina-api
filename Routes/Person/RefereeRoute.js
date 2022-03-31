const express = require('express');

const router = express.Router();
const crypt = require('bcrypt');
const RefereeModel = require('../../Models/Person/Referee.js');
const v = require('../../Functions/Validations.js');

router.get('/all', async (req, res) => {
    const referees = await RefereeModel.find();
    return res.status(200).send(referees).end();
});

router.post('/register', async (req, res) => {

    var name = req.body.name;
    var surname = req.body.surname;
    var email = req.body.email;
    var password = req.body.password;
    var type = {
        referee:true,
    };
    if (v.registerValidation(name, surname, email, password) == null) {
        const salt = await crypt.genSalt(10);
        const saltedpass = await crypt.hash(req.body.password.toString(), salt);
        const referee = new RefereeModel({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: saltedpass,
            type: type,
        });
        referee.save(function (error, resp) {
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
    var referee = await RefereeModel.findOne({ email: req.body.email });
    
    if (!referee) return res.status(404).json({ error: "There is no user " + req.body.email });

    if (!(await crypt.compare(req.body.password, referee.password))) return res.status(401).json({ error: "wrong password" });
    if(referee.type.referee != true){
        return res.json({
            error: "User is not referee",
        });
    };
    
    return res.status(201).json({
        email: referee.email,
        id: referee._id,
        name: referee.name,
        surname: referee.surname
    });
});

router.get('/get/:id', async (req, res) => {
    const id = req.params.id;
    if (id.length != 24) return res.json({
        error: "Invalid id",
    });
    const referee = await RefereeModel.findById(id);
    if (!referee) return res.status(404).json({
        error: "There is no user with " + id,
    });
    return res.json({
        name: referee.name,
        surname: referee.surname,
        email: referee.email,
        registerDate: referee.date,
        rating: referee.rating,
        comments: referee.comments,
        matches: referee.matches,
        adress: referee.adress,
    });
});

router.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    if (id.length != 24) return res.json({
        error: "Invalid id",
    });
    const referee = req.body.RefereeModel;
    if (!referee) return res.status(404).json({
        error: "There is no user " + id
    });
    
    if (!(await crypt.compare(req.body.password, referee.password))) return res.status(401).json({ error: "wrong password" });

    const salt = await crypt.genSalt(10);
    const saltedpass = await crypt.hash(req.body.password.toString(), salt);

    await RefereeModel.findByIdAndUpdate(id, {
        name: req.body.name,
        surname: req.body.surname,
        password: saltedpass,
    });
    return res.send(await RefereeModel.findById(id));
});

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    if (id.length != 24) return res.json({
        error: "Invalid id",
    });
    RefereeModel.findByIdAndDelete(id).then((referee) => {
        if (!referee) {
            return res.status(404).send("There is no user" + id).end();
        }
        return res.status(200).json({ referee, message: "User deleted succesfully" });
    }).catch((error) => {
        return res.status(400).send(error).end();
    });
});
router.get('')
module.exports = router;