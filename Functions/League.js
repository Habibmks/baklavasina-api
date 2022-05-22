const leagueModel = require('../Models/League/league.js');
const teamModel=require('../Models/Team/team.js');

const mongoose = require('mongoose');

const getAll = async (req, res) => {
    return res.status(200).send(await leagueModel.find()).end();
}

const join = async (req, res) => {
    const {leagueId,teamId}=req.body;
    if(!mongoose.Types.ObjectId.isValid(leagueId)|| !mongoose.Types.ObjectId.isValid(teamId))
        return res.status(404).json({error:"invalid id"});
    const league = await leagueModel.findById(leagueId);
    const team = await teamModel.findById(teamId);
    league.teams.push(team._id);
    team.leagues.push(league._id);
    await league.save();
    await team.save();
    return res.status(200).send(league);
}

const league = async (req, res) => {
    const{id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(200).json({error:"invalid id"});
    const league=leagueModel.findById(id);
    if(!league) return res.status(404).json({error:"there is no league"});
    return res.status(200).send(league);
}

module.exports = { getAll, join, league };