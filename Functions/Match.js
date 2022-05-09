const matchModel = require('../Models/Match/Match');
const prepareMatchModel = require('../Models/Match/PrepareMatch');
const easyMatchModel = require('../Models/Match/easyMatch');
const leagueMatchModel = require('../Models/Match/leagueMatch');
const tournamentMatchModel = require('../Models/Match/tournametMatch');

const v = require('./Validations.js');
const res = require('express/lib/response');

const getAll = async (req,res) => {
    const matches = await matchModel.find();
    return res.status(200).send(matches).end();
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

module.exports = { getAll, createEasy };