const mongoose = require('mongoose');
const match = require('./Match');

const leagueMatchSchema = mongoose.Schema({
    //Maç başlama tarihi saati
    startDate: {
        type: Date,
        required: true,
    },
    //Halısaha
    field: {
        type: String,
        required: false,
    },
    //Maçtaki kartlar
    cards: [
        {
            type: String,
            required: false,
        }
    ],
    played: {
        type: Boolean,
        required: true,
    },
    team1: {
        type: String,
        required: true,
    },
    team2: {
        type: String,
        required: true,
    },
    team1Goals: {
        count: {
            type: Number,
            required: true,
        },
        goals: [
            {
                goalId: { type: String }
            }
        ]
    },
    team2Goals: {
        count: {
            type: Number,
            required: true,
        },
        goals: [
            {
                goalId: { type: String }
            }
        ]
    },
    observers: [
        {
            observer: {
                type: String,
                required: false,
            }
        }
    ],
    winner: {
        teamid: {
            type: String,
            required: false,
        }
    },
    referees: [
        {
            referee: {
                type: String,
                required: false,
            }
        }
    ],
    league: {
        type: String,
    },
    points: {
        type: Number,
        require: false,
    },
});

const leagueMatch = match.discriminator('leagueMatchModel', leagueMatchSchema);

module.exports = mongoose.model('leagueMatch', leagueMatchSchema);