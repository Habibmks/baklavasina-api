const mongoose = require('mongoose');
const match = require('./Match');

const prepareMatchSchema = mongoose.Schema({
    //Maç başlama tarihi saati
    startDate: {
        type: Date,
        required: false,
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
});

const prepareMatch = match.discriminator('prepareMatchModel', prepareMatchSchema);

module.exports = mongoose.model('prepareMatch', prepareMatchSchema);