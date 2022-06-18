const crypt = require('bcrypt');
const personModel = require('../Models/Person/Person.js');
const teamModel = require('../Models/Team/team.js');
const transferModel = require('../Models/transfer.js');
const v = require('../Functions/Validations.js');
const { default: mongoose } = require('mongoose');
const { json } = require('express/lib/response');
const req = require('express/lib/request');

const getAll = async (req, res) => {
    const people = await personModel.find();
    return res.status(200).send(people).end();
}
const del = async (req, res) => {
    const { userId } = req.params;
    await personModel.findOneAndDelete({ id: userId });
    return res.send("silindi");
}

const photoUpdate = async (req, res) => {
    const { personId, photoUrl } = req.body;
    await personModel.findOneAndUpdate({ id: personId }, { picture: photoUrl });
    return res.send(await personModel.findOne({ id: personId }));
}

const personStatistics = async (req, res) => {
    const personId = req.params.personId;
    const person = await personModel.findOne({ id: personId });

    return res.json({
        goalCount: person.goals.length,
        matches: person.matches,
        assistCount: person.assist.length,
    })
}

const login = async (req, res) => {
    email = req.body.email;
    password = req.body.password;
    if (!v.emailValidation(email)) return res.json({ error: "Email is not valid" });

    var person = await personModel.findOne({ email: req.body.email });
    if (!person) return res.status(404).json({ error: "There is no user " + req.body.email });

    if (!(await crypt.compare(req.body.password, person.password))) return res.status(401).json({ error: "wrong password" });

    if (person.type.player != true)
        return res.json({ error: 'User is not player' });
    return res.status(201).json({
        email: person.email,
        id: person._id,
        name: person.name,
        surname: person.surname
    });
}

const register = async (req, res) => {
    var name = req.body.name;
    var surname = req.body.surname;
    var email = req.body.email;
    // var password = req.body.password;
    var id = req.body.id;
    var type = {
        player: true,
    };
    //true = male, false = female
    var gender = req.body.gender;
    var favTeam = req.body.favTeam;
    var position = req.body.position;
    var uniformNo = req.body.uniformNo;
    var age = req.body.age;
    var telNo = req.body.telNo;
    // var person = personModel.findOne({ email: email});
    // if(person){
    //     res.status(409).json({ error: "Already registered", }).end();
    // }
    // var address = {
    //     city: req.body.city,
    //     state: req.body.state,
    // }
    var address = {
        country: req.body.country,
        city: req.body.city,
        state: req.body.state,
    }
    if (v.registerValidation(name, surname) == null) {
        // const salt = await crypt.genSalt(10);
        // const saltedpass = await crypt.hash(req.body.password.toString(), salt);
        const newperson = new personModel({
            name: name,
            surname: surname,
            email: email,
            // password: saltedpass,
            id: id,
            type: type,
            favTeam: favTeam,
            position: position,
            gender: gender,
            captain: false,
            team: null,
            adress: address,
            age: age,
            uniformNo: uniformNo,
            telNo: telNo,
        });
        newperson.save(function (error, resp) {
            if (error) {
                return res.status(400).send(error);
            } else {
                return res.status(200).send(newperson);
            }
        });
    } else {
        var e = await v.registerValidation(name, surname);
        return res.json({ error: e });
    }
}

const update = async (req, res) => {
    const { name, surname, email, id, birthday, telNo, favTeam, } = req.body;
    //if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('invalid user id: ${id}');
    const person = await personModel.find({ id: id });
    //const saltedPass = await crypt.hash(password.toString(), await crypt.genSalt(10));

    await personModel.findOneAndUpdate({ id: id }, {
        name: name, surname: surname, email: email,
        birthday: birthday, telNo: telNo, favTeam: favTeam,
    });
    res.status(200).send((await personModel.find({ id: id }))[0]);

}

const getPerson = async (req, res) => {
    const { id } = req.params;
    //if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('invalid user id: ${id}');
    res.status(200).send(await personModel.find({ id: id }));
}

const teamRequest = async (req, res) => {
    const { teamId, personId, uniformNo, position, } = req.body;
    if (!mongoose.Types.ObjectId.isValid(teamId)) return res.status(404).send('invalid user or team id: ${id}');
    const person = await personModel.findOne({ id: personId });
    if (person.captain) return res.status(404).json({ error: "Player is a captain" });
    invite = { teamId: teamId, uniformNo: uniformNo, position: position };
    person.inviteTeam.push(invite);
    await person.save();
    return res.send(person);
}

const invites = async (req, res) => {
    const { id } = req.params;
    //if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('invalid user id: ${id}');
    const person = (await personModel.find({ id: id }))[0];
    if (!person) res.status(404).json({ error: "There is no user;" }).end();
    res.status(200).send(person.inviteTeam);
}

const dlete = async (req, res) => {
    const { userId } = req.body;
    await personModel.findByIdAndDelete(userId);
}

const acceptInvite = async (req, res) => {
    const { id, inviteId, teamId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(inviteId)) return res.status(404).send('invalid user or team id: ${id}');
    const person = (await personModel.find({ id: id }))[0];
    if (person.team) return res.status(404).json({ error: "Player is already in team" });
    const invite = person.inviteTeam.find(invite => invite._id == inviteId);
    await addPlayer(person, invite.teamId);
    //createTransfer()
    await newTransfer(person, await teamModel.findOne({ _id: teamId }));
    await personModel.updateMany({}, {
        $pull: {
            inviteTeam: {
                _id: inviteId
            }
        }
    });

    return res.status(200).json({
        invites: (await personModel.findOne({ id: id })).inviteTeam,
        transfers: (await transferModel.findOne({ player: id })),
        team: (await teamModel.findById(invite.teamId))
    });
}

async function addPlayer(person, teamId) {
    var team = await teamModel.findById(teamId);
    await team.players.push(person.id);
    await team.save();
    await personModel.findOneAndUpdate({ id: person.id }, { team: teamId });
    // await personModel.findByIdAndUpdate(person._id, { team: teamId });
    return true;
}

const newTransfer = async (person, team) => {
    if (person.teamId == null) var sender = "-";
    else var sender = person.team;
    const newTransfer = new transferModel({
        sender: sender,
        receiver: team._id,
        player: person.id,
        date: Date.now()
    });
    await newTransfer.save().catch((err) => {
        console.log(err);
    });
    person.transfers.push(newTransfer);
    person.save();
    team.transfers.push(newTransfer);
    team.save();
}

const rejectInvite = async (req, res) => {
    const { id, inviteId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(inviteId))
        return res.status(404).send('invalid user or team id: ${id}');
    await personModel.updateMany({}, {
        $pull: {
            inviteTeam: {
                _id: inviteId,
            }
        }
    });
    const invites = (await personModel.findOne({ id: id })).inviteTeam;
    res.status(200).send(invites);
}

const updateTeam = async (req, res) => {
    const { id, favTeam, uniformNo, teamId, } = req.body;

}

const leaveTeam = async (req, res) => {
    const { personId } = req.params;
    const person = await personModel.findOne({ id: personId });
    person.team = null;
    person.save();
    return res.send(person);
}

const newReferee = async (req, res) => {
    const { id } = req.body;
    const person = await personModel.findById(id);
    person.type.referee = true;
    await person.save();
    res.send(person);
}

const resetReferee = async (req, res) => {
    const { id } = req.body;
    const person = await personModel.findById(id);
    person.type.referee = false;
    await person.save();
    res.send(person);
}

const newObserver = async (req, res) => {
    const { id } = req.body;
    const person = await personModel.findById(id);
    person.type.observer = true;
    await person.save();
    res.send(person);
}

const resetObserver = async (req, res) => {
    const { id } = req.body;
    const person = await personModel.findById(id);
    person.type.observer = false;
    await person.save();
    res.send(person);
}

module.exports = {
    rejectInvite,
    getAll,
    login,
    register,
    update,
    getPerson,
    teamRequest,
    invites,
    acceptInvite,
    newReferee,
    newObserver,
    resetReferee,
    resetObserver,
    leaveTeam,
    del,
    photoUpdate,
    personStatistics,
};
