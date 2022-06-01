const mongoose = require('mongoose');
const match = require('./Match');

const prepareMatchSchema = mongoose.Schema({
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
            observer: String,
        }
    ],
    winner: {
        teamid: {
            type: String,
        }
    },
});

const prepareMatch = match.discriminator('prepareMatchModel', prepareMatchSchema);

module.exports = mongoose.model('prepareMatch', prepareMatchSchema);