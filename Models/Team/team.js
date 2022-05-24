const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    statistics: {
        type: String,
        required: false,
    },
    captain: {
        type: String,
        required: true,
    },
    contract: [
        {
            contractid: {
                type: String,
            },
        }
    ],
    matches: [
        {
            match: {
                type: String,
            }
        }
    ],
    players: [
        { type: String }
    ],
    teamPower: {
        type: String,
        required: false,
    },
    transfers: [
        {
            transfer: {
                type: String,
            }
        }
    ],
    leagues: [
        { league: mongoose.ObjectId },
    ],
    invites: [
        {
            sender: String,
            field: String,
            observer: String,
            referee: String,
            type: String
        }
    ],
    tournaments: [
        { tournament: mongoose.ObjectId },
    ],
    leagues: [
        { league: mongoose.ObjectId },
    ],
    gender: Boolean,
});

const Team = mongoose.model('Team', teamSchema);

module.exports = mongoose.model('Team', teamSchema);