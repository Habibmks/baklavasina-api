const mongoose = require("mongoose");
const person = require("../person.js");

const playerSchema = mongoose.Schema({
    type: {
        player: Boolean,
        referee: Boolean,
        observer: Boolean,
    },
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
    uniformNo: { type: String, required: false, },
    contrats: [
        {
            type: String, required: false ,
        }
    ],
    team: {
        type: String,
        required: false
    },
    transfers: [
        {
            type: String, required: false ,
        }
    ],
    pPower: {
        power: { type: Number, require: false },
        required: false,
    },
    adress: {
        type: String,
        required: false,
    },
});

const Player = person.discriminator('PlayerModel', playerSchema);

module.exports = mongoose.model("Player", playerSchema);