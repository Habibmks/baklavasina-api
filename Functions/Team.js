const teamModel = require('../Models/Team/team.js');
const personModel = require('../Models/Person/Person.js');
const prepareModel = require('../Models/Match/PrepareMatch.js');
const easyModel = require('../Models/Match/easyMatch.js');
const leagueModel = require('../Models/Match/leagueMatch.js');
const tournamentModel = require('../Models/Match/tournamentMatch.js');

const v = require('./Validations.js');
const mongoose = require('mongoose');

const getAll = async (req, res) => {
    return res.status(200).send(await teamModel.find()).end();
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

module.exports = {
    getAll,
    createTeam,
    matchRequest,
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

async function createEasy(home, guest, field) {
    var match = new easyModel({
        team1: home,
        team2: guest,
        field: field,
        played: false,
    });
    console.log(home);
    var team1 = await teamModel.findById(home).catch((err) => { console.log(err) });
    var team2 = await teamModel.findById(guest);
    await match.save().catch((err) => {
        return err;
    });
    console.log(match);
    await team1.matches.push(match);
    await team1.save();
    await team2.matches.push(match);
    await team2.save();
    return match;
}

async function createPrepare(home, guest) {

}

async function createLeague(home, guest) {

}

async function createTournament(home, guest) {

}