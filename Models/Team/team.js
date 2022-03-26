const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    statistics: {
        type: String,
        required: true,
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
        {
            player: {
                type: String,
            }
        }
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
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;