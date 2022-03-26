const mongoose = require('mongoose');
const person = require('./Person');

const observerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: [
        {
            type: String
        },
    ],
    date: {
        type: Date,
        default: Date.now
    },
    rating: {
        totalScore: {
            type: Number, required: false
        },
        ratings: [
            {
                personId: { type: String, required: true },
                rating: { type: Number, required: false },
                required: false
            },
        ]
    },
    comments: [
        {
            commentId: {type: String,required: true},
            personId: { type: String, required: true},
            comment: {type: String, required: true},
            required: false,
        }
    ],
    matches: [
        {
            matchId: {type: String, required: true},
            required: false,
        }
    ],
    adress: {
        type: String,
        required: false,
    },
});

const Referee = person.discriminator('ObserverModel', observerSchema);

module.exports = mongoose.model("Observer",observerSchema);