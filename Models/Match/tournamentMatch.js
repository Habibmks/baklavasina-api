const mongoose = require('mongoose');
const match = require('./Match');

const tournamentMatchSchema = mongoose.Schema({
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
    observers: [
        {
            observer: {
                type: String,
            }
        }
    ],
    winner: {
        teamid: {
            type: String,
        }
    },
    referees: [
        {
            referee: {
                type: String,
            }
        }
    ],
    tournament: {
        type: String,
    },
});

const tournamentMatch = match.discriminator('tournamentMatchModel', tournamentMatchSchema);

module.exports = mongoose.model('tournamentMatch', tournamentMatchSchema);