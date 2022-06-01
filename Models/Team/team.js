const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
    name: {
        type: String,
    },
    statistics: {
        type: String,
    },
    captain: {
        type: String,
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
    players:[String],
    teamPower: {
        type: String,
    },
    transfers: [
        {
            transfer: String,
        }
    ],
    invites: [
        {
            sender: String,
            field: String,
            observer: String,
            referee: String,
            type: String,
            city: String,
            state: String
            
        }
    ],
    tournaments: [
        { tournament: String },
    ],
    leagues: [
        { league: String },
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