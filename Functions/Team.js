const teamModel = require('../Models/Team/team.js');
const personModel = require('../Models/Person/Person.js');
// const prepareModel = require('../Models/Match/PrepareMatch.js');
// const easyModel = require('../Models/Match/easyMatch.js');
// const leagueModel = require('../Models/Match/leagueMatch.js');
// const tournamentModel = require('../Models/Match/tournamentMatch.js');

const v = require('./Validations.js');
const m = require('./Match.js');
const mongoose = require('mongoose');

const getAll = async (req, res) => {
    return res.status(200).send(await teamModel.find()).end();
}

const getTeam = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('invalid id');
    const team = await teamModel.findById(id);
    if (!team) return res.status(404).json({ error: "There is no team" + id });
    return res.status(200).send(team);
}

const createTeam = async (req, res) => {
    const { personId, teamName } = req.body;
    if (!mongoose.Types.ObjectId.isValid(personId))
        return res.status(404).send('invalid user id: ${id}');
    const newTeam = new teamModel({
        captain: personId,
        name: teamName,
    });
    newTeam.players.push(personId);
    newTeam.save(function (error, resp) {
        if (error)
            return res.send(error);
        else {
            return res.status(200).send(newTeam);
        }
    });
    return;
}

const matchRequest = async (req, res) => {
    const { homeId, guestId, type, saha } = req.body;
    switch (type) {
        case "easy":
            return res.send((await inviteEasy(homeId, guestId, saha)));
            break;
        case "league":
            return res.send((await inviteLeague(homeId, guestId, saha, req.body.referee, req.body.observer)));
            break;
        case "prepare":
            return res.send((await invitePrepare(homeId, guestId, req.body.observer, saha)));
            break;
        case "tournament":
            return res.send((await inviteTournament(homeId, guestId, saha, req.body.referee, req.body.observer)));
            break;
        default:
            break;
    }
}

const acceptInvite = async (req, res) => {
    const { teamId, inviteId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(teamId) || !mongoose.Types.ObjectId.isValid(inviteId)) return res.status(404).send('invalid invite or team id: ${id}');
    const team = await teamModel.findById(teamId);
    const invite = team.invites.find(invite => invite._id == inviteId);
    type = invite.type;
    switch (type) {
        case "easy":
            return res.send((await m.createEasy(invite.sender, invite.teamId, invite.field)));
            break;
        case "league":
            return res.send((await m.createLeague(invite.sender, teamId, invite.field, invite.referee, invite.observer)));
            break;
        case "prepare":
            return res.send((await m.createPrepare(invite.sender, teamId, invite.observer, invite.field)));
            break;
        case "tournament":
            return res.send((await m.createTournament(invite.sender, teamId, invite.field, invite.referee, invite.observer)));
            break;
        default:
            break;
    }
}

const rejectInvite = async (req, res) => {
    const { teamId, inviteId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(teamId) || !mongoose.Types.ObjectId.isValid(inviteId)) return res.status(404).send('invalid invite or team id: ${id}');
    await teamModel.updateMany({}, {
        $pull: {
            invites: {
                _id: inviteId,
            }
        }
    });
    const invites = (await teamModel.findById(teamId)).invites;
    return res.status(200).send(invites);
}

const findByGender = async (req, res) => {
    const { gender } = req.params;
    return (await res.send(await teamModel.find({ results: { $elemMatch: { gender: gender } } })));
}

const findByName = async (req, res) => {
    const { name } = req.params;
    return (await res.send(await teamModel.find({ result: { $regex: '.*' + name + '.*' } })));
}

const findByState = async (req, res) => {
    const { state } = req.params;
    return (await res.send(await teamModel.find({ result: { $regex: '.*' + state + '.*' } })));
}

module.exports = {
    getAll,
    createTeam,
    matchRequest,
    acceptInvite,
    rejectInvite,
    getTeam,
    findByGender,
    findByName,
    findByState,
};

async function inviteEasy(home, guest, field) {
    var team2 = await teamModel.findById(guest);
    var invite = { sender: home, field: field, type: easy };
    team2.invites.push(invite);
    await team2.save();
    return team2;
}


async function invitePrepare(home, guest, observer, field) {
    var team2 = await teamModel.findById(guest);
    var invite = { sender: home, field: field, observer: observer, type: prepare };
    await team2.invites.push(invite);
    await team2.save();
    return team2;
}

async function inviteTournament(home, guest, field, referee, observer) {
    var team2 = await teamModel.findById(guest);
    console.log(observer);
    var invite = { sender: home, field: field, observer: observer, referee: referee, type: tournament };
    team2.invites.push(invite);
    await team2.save();
    return team2;
}

async function inviteLeague(home, guest, field, referee, observer) {
    var team2 = await teamModel.findById(guest);
    var invite = { sender: home, field: field, referee: referee, observer: observer, type: league };
    team2.invites.push(invite);
    await team2.save();
    return team2;
}

// async function createEasy(home, guest, field) {
//     var match = new easyModel({
//         team1: home,
//         team2: guest,
//         field: field,
//         played: false,
//     });
//     var team1 = await teamModel.findById(home).catch((err) => { console.log(err) });
//     var team2 = await teamModel.findById(guest);
//     await match.save().catch((err) => {
//         return err;
//     });
//     await team1.matches.push(match);
//     await team1.save();
//     await team2.matches.push(match);
//     await team2.save();
//     return match;
// }

// async function createPrepare(home, guest) {
//     var match = new prepareModel({
//         team1:home,
//         team2: guest,
//         field: field,
//         played: false,
//         observer: observer
//     });
//     var team1 = await teamModel.findById(home);
//     var team2 = await teamModel.findById(guest);
//     await match.save().catch((err)=>{
//         return err;
//     });
//     await team1.matches.push(match);
//     await team1.save();
//     await team2.matches.push(match);
//     await team2.save();
//     return match;
// }

// async function createLeague(home, guest) {
//     var match = new leagueModel({
//         team1: home,
//         team2: guest,
//         field: field,
//         played: false,
//         observer: observer,
//         referee: referee
//     });
//     var team1 = await teamModel.findById(home);
//     var team2 = await teamModel.findById(guest);
//     await match.save().catch((err)=>{
//         return err;
//     });
//     await team1.matches.push(match);
//     await team1.save();
//     await team2.matches.push(match);
//     await team2.save();
//     return match;
// }

// async function createTournament(home, guest) {
//     var match = new tournamentModel({
//         team1: home,
//         team2: guest,
//         field: field,
//         played: false,
//         observer: observer,
//         referee: referee
//     });
//     var team1 = await teamModel.findById(home);
//     var team2 = await teamModel.findById(guest);
//     await match.save().catch((err)=>{
//         return err;
//     });
//     await team1.matches.push(match);
//     await team1.save();
//     await team2.matches.push(match);
//     await team2.save();
//     return match;
// }