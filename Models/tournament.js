const mongoose = require('mongoose');

const tournamentSchema = mongoose.Schema({
    teamCount: Number,
    teams: [
        { team: String },
    ],
    matches: [
        { match: String},
    ],
    name: String,
    
});

const tournament = mongoose.model('Tournament', tournamentSchema);

module.exports = tournament;