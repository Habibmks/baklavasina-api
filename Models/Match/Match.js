const mongoose = require('mongoose');

const matchOptions = {
    discriminatorKey: 'matchtype',
    collection: 'match',
}

const macthSchema = mongoose.Schema({

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
    winner: {
        teamid: {
            type: String,
            required: false,
        }
    },
    state: String,
}, matchOptions);

const Match = mongoose.model('MatchBase', macthSchema);

module.exports = mongoose.model('Match', macthSchema);
