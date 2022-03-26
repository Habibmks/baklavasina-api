const mongoose = require('mongoose');

const fixtureSchema = mongoose.Schema({
    goalCount: {
        type: Number,
        required: false,
    },
    week: {
        type: Number,
        required: false,
    },
    league: {
        type: String,
        required: true,
    },
    matchCount: {
        type: Number,
        required: false,
    },
    matches: [
        {
            match: {
                type: String,
            }
        }
    ],
    teams: [
        {
            team: {
                type: String,
            }
        }
    ],
});

const Fixture = mongoose.model('Fixture', fixtureSchema);

module.exports = Fixture;