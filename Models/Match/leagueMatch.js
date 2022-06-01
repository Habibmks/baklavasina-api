const mongoose = require('mongoose');
const match = require('./Match');

const leagueMatchSchema = mongoose.Schema({
    //Maç başlama tarihi saati
    startDate: {
        type: Date,
    },
    //Halısaha
    field: {
        type: String,
    },
    //Maçtaki kartlar
    cards: [
        {
            type: String,
        }
    ],
    played: {
        type: Boolean,
    },
    team1: {
        type: String,
    },
    team2: {
        type: String,
    },
    team1Goals: {
        count: {
            type: Number,
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
        },
        goals: [
            {
                goalId: { type: String }
            }
        ]
    },
    
    winner: {
        teamid: {
            type: String,
        }
    },
    observers: [
        {
            observer: {
                type: String,
            }
        }
    ],
    referees: [
        {
            referee: {
                type: String,
            }
        }
    ],
    league: {
        type: String,
    },
    points: {
        type: Number,
    },
});

const leagueMatch = match.discriminator('leagueMatchModel', leagueMatchSchema);

module.exports = mongoose.model('leagueMatch', leagueMatchSchema);