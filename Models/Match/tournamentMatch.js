const mongoose = require('mongoose');
const match = require('./Match');

const tournamentMatchSchema = mongoose.Schema({
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
    tournament: {
        type: String,
    },
});

const tournamentMatch = match.discriminator('tournamentMatchModel', tournamentMatchSchema);

module.exports = mongoose.model('tournamentMatch', tournamentMatchSchema);