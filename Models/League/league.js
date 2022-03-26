const mongoose = require('mongoose');

const leagueSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    fixture: {
        type: String,
        require: false,
    },
    leagueNo: {
        type: String,
        require: false,
    },
    score: {
        type: String,
        require: false,
    },
    teamCount: {
        type: Number,
        required: false,
    },
    teams: [
        {
            team: {
                type: String,
            }
        }
    ],
    startDate: {
        type: Date,
        default: Date.now,
    }
});

const League = mongoose.model('League', leagueSchema);

module.exports = League;