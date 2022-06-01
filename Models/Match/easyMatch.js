const mongoose = require('mongoose');
const match = require('./Match');

const easyMatchSchema = mongoose.Schema({
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
            default: 0
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
            default: 0
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
});

const easyMatch = match.discriminator('easyMatchModel', easyMatchSchema);

module.exports = mongoose.model('easyMatch', easyMatchSchema);