const mongoose = require('mongoose');

const scoreSchema = mongoose.Schema({
    league: {
        type: String,
        required: true,
    },
    teams: [
        {
            team: {
                type: String,
            }
        }
    ],
    teamPoints: [
        {
            point: {
                type: Number,
            }
        }
    ],
});

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;