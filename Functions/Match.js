const matchModel = require('../Models/Match/Match');
const prepareMatchModel = require('../Models/Match/PrepareMatch');
const easyMatchModel = require('../Models/Match/easyMatch');
const leagueMatchModel = require('../Models/Match/leagueMatch');
const tournamentMatchModel = require('../Models/Match/tournamentMatch');
const goalModel=require('../Models/goal.js');
const cardModel=require('../Models/card.js');

const v = require('./Validations.js');
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
    if (!match) return res.status(404).json({ error: "There is no match " + id });
    return res.status(200).send(match);
}

async function createEasy(home, guest, field) {
    var match = new easyModel({
        team1: home,
        team2: guest,
        field: field,
        played: false,
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
    return match;
}

async function createPrepare(home, guest, observer, field) {
    var match = new prepareMatchModel({
        team1: home,
        team2: guest,
        field: field,
        observer: observer,
        played: false
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
    return match;
}

async function createLeague(home, guest, field, referee, observer) {
    var match = new leagueMatchModel({
        team1: home,
        team2: guest,
        referee: referee,
        observer: observer,
        field: field,
        played: false
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
    return match;
}

async function createTournament(home, guest, field, referee, observer) {
    var match = new tournamentMatchModel({
        team1: home,
        team2: guest,
        referee: referee,
        observer: observer,
        field: field,
        played: false
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
    return match;

}

const findByState = async (req, res) => {
    const { state } = req.params;
    return (await res.send(await matchModel.find({ state: state})));
}

const addGoal=async(req,res)=>{
    const {teamId,personId,matchId,minute,penalty}=req.body;
    const goal=new goalModel({
        team:teamId,
        penalty:penalty,
        minute:minute,
        match:matchId,
        player:personId,
    });
    match.save();
    return res.status(200).send(goal);
}

const addCard=async(req,res)=>{
    const {color,match,player,penalty,team}=req.body;
    const card=new cardModel({
        color:color,
        match:match,
        player:player,
        penalty:penalty,
        team:team,
    });
    card.save();
    return res.status(200).send(card);
}

module.exports = { getAll, createEasy, createPrepare, createLeague, createTournament, getMatch, findByState };