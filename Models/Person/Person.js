const mongoose = require('mongoose');

const personOptions = {
    discriminatorKey: 'persontype',
    collection: 'people',
}

const personSchema = mongoose.Schema({
    id: String,
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
    // password: {
    //     type: String,
    //     required: true
    // },
    // token: [
    //     {
    //         type: String
    //     },
    // ],
    date: {
        type: Date,
        default: Date.now
    },
    contrats: [
        {
            type: String, required: false,
        }
    ],
    team: String,
    transfers: [

        String,
        String,
        String,
        Date,

    ],
    pPower: {
        power: { type: Number, require: false },
        required: false,
    },
    captain: Boolean,
    refereeRating: {
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
    refereeComments: [
        {
            commentId: { type: String, required: true },
            personId: { type: String, required: true },
            comment: { type: String, required: true },
            required: false,
        }
    ],
    refereeMatches: [
        {
            matchId: { type: String, required: true },
            required: false,
        }
    ],
    observerRating: {
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
    observerComments: [
        {
            commentId: { type: String, required: true },
            personId: { type: String, required: true },
            comment: { type: String, required: true },
            required: false,
        }
    ],
    observerMatches: [
        {
            matchId: { type: String, required: true },
            required: false,
        }
    ],
    adress: {
        country:String,
        city: { type: String },
        state: { type: String },
    },
    telNo: {
        type: Number
    },
    birthday: {
        type: String
    },
    favTeam: {
        type: String
    },
    position: {
        type: String,
    },
    inviteTeam: [
        {
            teamId: String,
            uniformNo: String,
            position: String,
        }
    ],
    gender: Boolean,
    picture: String,
    mevki: String,
    goals: [
        mongoose.ObjectId,
    ],
    uniformNo: { type: String, required: false, },
}, personOptions)

const Person = mongoose.model('PersonBase', personSchema);

module.exports = mongoose.model('Person', personSchema);