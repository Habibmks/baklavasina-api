const tournamentModel = require('../Models/tournament.js');
const teamModel = require('../Models/Team/team.js');
const matchesModel=require('../Models/Match/tournamentMatch.js');

const mongoose = require('mongoose');

const getAll = async (req, res) => {
    return res.status(200).send(await tournamentModel.find()).end();
}

const tournament = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: "invalid id" + id });
    const tournament = await tournamentModel.findById(id);
    if (!tournament) return res.status(404).json({ error: "there is no tournament" + id });
    return res.status(200).send(tournament);
}

const join = async (req, res) => {
    const { tournamentId, teamId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(tournamentId) || !mongoose.Types.ObjectId.isValid(teamId)) return res.status(404).json({ error: "invalid ids" + tournamentId + teamId });
    const tournament = await tournamentModel.findById(tournamentId);
    if (!tournament) return res.status(404).json({ error: "there is no tournament" });
    const team = await teamModel.findById(teamId);
    tournament.teams.push(team._id);
    team.tournaments.push(tournament._id);
    await tournament.save();
    await team.save();
    return res.send(200).send(tournament);
}

const create = async (req, res) => {
    const { name } = req.body;
    const teams = req.body.teams;
    // console.log(req.body.teams+"\n");
    // console.log(teams);
    const tournament = new tournamentModel({
        name: name,
        teams: teams,
        teamCount: teams.length,
    });
    await tournament.save().catch((err) => {
        if(err)return res.send(err).end();
        else return res.send(tournament).end();
    });
}

const teams = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: "invalid id" });
    const tournament = tournamentModel.findById(id);
    const teamIds = tournament.teams;
    var teams = [];
    for(let i=0;i<teamIds.length;i++){
        teams.push(await teamModel.findOne({_id:teamIds[0]}));
    }
    console.log(teams);
    if (!tournament) return res.status(404).json({ error: "there is no tournament " });
    return res.status(200).send(tournament.teams);
}

const matches = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(is)) return res.status(404).json({ error: "invalid id" });
    const tournament = tournamentModel.findById(id);
    const matcheIds = tournament.matches;
    var matches = [];
    for(let i = 0;i<matcheIds.length;i++){
        matches.push(await matchesModel.findOne({_id:matcheIds[i]}));
    }
    console.log(matches);
    if (!tournament) return res.status(404).json({ error: "there is no tournament" });
    return res.status(200).send(tournament.matches);
}



module.exports = { getAll, tournament, join, create, teams, matches };