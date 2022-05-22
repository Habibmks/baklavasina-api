const tournamentModel = require('../Models/tournament.js');
const teamModel = require('../Models/Team/team.js');

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
    const { name, teams } = req.body;
    const tournament = new tournamentModel({
        name: name,
        teams: teams,
        teamCount: teams.size(),
    });
    tournament.save().catch((err) => {
        res.send(err);
    });
    res.send(tournament);
}

const teams = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: "invalid id" });
    const tournament = tournamentModel.findById(id);
    if (!tournament) return res.status(404).json({ error: "there is no tournament " });
    return res.status(200).send(tournament.teams);
}

const matches = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(is)) return res.status(404).json({ error: "invalid id" });
    const tournament = tournamentModel.findById(id);
    if (!tournament) return res.status(404).json({ error: "there is no tournament" });
    return res.status(200).send(tournament.matches);
}



module.exports = { getAll, tournament, join, create, teams, matches };