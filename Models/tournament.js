const mongoose = require('mongoose');

const tournamentSchema = mongoose.Schema({
    teamCount: Number,
    teams: [
        { team: mongoose.ObjectId },
    ],
    matches: [
        { match: mongoose.ObjectId},
    ],
    name: String,
    
});

const tournament = mongoose.model('Tournament', tournamentSchema);

module.exports = tournament;