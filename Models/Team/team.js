const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
    name: String,
    statistics: String,
    captain: String,
    contract: [
        String,
    ],
    matches: [
        String,
    ],
    players: [
        String,
    ],
    teamPower: {
        type: String,
    },
    transfers: [

        String,
        String,
        String,
        Date,

    ],
    invites: [
        {
            sender: String,
            field: String,
            observer: String,
            referee: String,
            type: String,
            city: String,
            state: String,
        }
    ],
    tournaments: [
        String,
    ],
    leagues: [
        String,
    ],
    gender: Boolean,
    address: {
        country: String,
        city: String,
        state: String,
    },
    type: String,
},
    { typeKey: '$type' },
);

const Team = mongoose.model('Team', teamSchema);

module.exports = mongoose.model('Team', teamSchema);