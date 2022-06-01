const matchModel = require('../Models/Match/Match');
const teamModel = require('../Models/Team/team');
const personModel = require('../Models/Person/Person.js');
const goalModel = require('../Models/goal.js');
const cardModel = require('../Models/card.js');
const leagueModel = require('../Models/League/league.js');
const tournamentModel = require('../Models/tournament.js');

const v = require('./Validations.js');
const t = require('./Team.js');
const res = require('express/lib/response');
const { default: mongoose } = require('mongoose');
const { restart } = require('nodemon');

const getAll = async (req, res) => {
    const matches = await matchModel.find();
    return res.status(200).send(matches).end();
}

const getMatch = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('invalid id');
    const match = await matchModel.findById(id);
    const home = await teamModel.findById(match.team1);
    const guest = await teamModel.findById(match.team2);
    const homePlayers = await teamPlayers(home._id);
    const guestPlayers = await teamPlayers(guest._id);
    if (!match) return res.status(404).json({ error: "There is no match " + id });
    return res.status(200).json({
        match: match,
        home: home,
        guest: guest,
        homePlayers: homePlayers,
        guestPlayers: guestPlayers,
    });
}

async function teamPlayers(teamId) {
    const team = await teamModel.findById(teamId);
    const playerIds = team.players;
    var players = []
    for (i = 0; i < playerIds.length; i++) {
        players.push(await personModel.findOne({ id: playerIds[i] }));
    }
    console.log(await personModel.findOne({ id: playerIds[i] }))
    console.log(players);
    return players;
}

async function createEasy(home, guest, field, inviteId, homePlayers, guestPlayers, city, state) {
    var match = new matchModel({
        type: "easy",
        home: home,
        guest: guest,
        field: field,
        played: false,
        homePlayers: homePlayers,
        guestPlayers: guestPlayers,
        city: city,
        state: state,
    });
    var team1 = await teamModel.findById(home).catch((err) => { console.log(err) });
    var team2 = await teamModel.findById(guest);
    await match.save().catch((err) => {
        return err;
    });
    await team1.matches.push(match);
    await team1.save();
    await team2.matches.push(match);
    await team2.save();
    await teamModel.updateMany({}, {
        $pull: {
            invites: {
                _id: inviteId,
            }
        }
    });
    return match;
}

async function createPrepare(home, guest, observer, field, inviteId, homePlayers, guestPlayers, city, state) {
    var match = new MatchModel({
        type: "prepare",
        team1: home,
        team2: guest,
        field: field,
        observer: observer,
        played: false,
        homePlayers: homePlayers,
        guestPlayers: guestPlayers,
        city: city,
        state: state
    });
    var team1 = await teamModel.findById(home);
    var team2 = await teamModel.findById(guest);
    await match.save().catch((err) => {
        return err;
    });
    await team1.matches.push(match);
    await team1.save();
    await team2.matches.push(match);
    await team2.save();
    await teamModel.updateMany({}, {
        $pull: {
            invites: {
                _id: inviteId,
            }
        }
    })
    return match;
}

async function createLeague(home, guest, field, referee, observer, inviteId, homePlayers, guestPlayers, city, state, leagueId) {
    var match = new MatchModel({
        type: "league",
        team1: home,
        team2: guest,
        referee: referee,
        observer: observer,
        field: field,
        played: false,
        homePlayers: homePlayers,
        guestPlayers: guestPlayers,
        city: city,
        state: state
    });
    var team1 = await teamModel.findById(home);
    var team2 = await teamModel.findById(guest);
    await match.save().catch((err) => {
        return err;
    });
    await team1.matches.push(match);
    await team1.save();
    await team2.matches.push(match);
    await team2.save();
    await leagueModel.updateMany({ _id: leagueId }, {
        $push: {
            teams: teamId
        }
    });
    await teamModel.updateMany({}, {
        $pull: {
            invites: {
                _id: inviteId,
            }
        }
    })
    return match;
}

async function createTournament(home, guest, field, referee, observer,inviteId,homePlayers,guestPlayers,city,state,tournamentId) {
    var match = new MatchModel({
        type:"tournament",
        team1: home,
        team2: guest,
        referee: referee,
        observer: observer,
        field: field,
        played: false,
        homePlayers:homePlayers,
        guestPlayers:guestPlayers,
        city:city,
        state:state,
    });
    var team1 = await teamModel.findById(home);
    var team2 = await teamModel.findById(guest);
    await match.save().catch((err) => {
        return err;
    });
    await team1.matches.push(match);
    await team1.save();
    await team2.matches.push(match);
    await team2.save();
    await tournamentModel.updateMany({_id:tournamentId},{
        $push: {
            teams:teamId,
        }
    });
    await teamModel.updateMany({},{
        $pull:{
            invites:{
                _id:inviteId,
            }
        }
    });
    return match;
}

const findByState = async (req, res) => {
    const { state } = req.params;
    return (await res.send(await matchModel.find({ state: state })));
}

const addGoal = async (req, res) => {
    const { teamId, personId, matchId, minute, penalty } = req.body;
    const goal = new goalModel({
        team: teamId,
        penalty: penalty,
        minute: minute,
        match: matchId,
        player: personId,
    });
    match.save();
    return res.status(200).send(goal);
}

const addCard = async (req, res) => {
    const { color, match, player, penalty, team } = req.body;
    const card = new cardModel({
        color: color,
        match: match,
        player: player,
        penalty: penalty,
        team: team,
    });
    card.save();
    return res.status(200).send(card);
}

module.exports = {
    getAll,
    createEasy,
    createPrepare,
    createLeague,
    createTournament,
    getMatch,
    findByState,
    getMatch,
    addCard,
    addGoal,
};