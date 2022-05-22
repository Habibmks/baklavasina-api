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
        type: mongoose.ObjectId,
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
        { player: mongoose.ObjectId }
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
            sender: mongoose.ObjectId,
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