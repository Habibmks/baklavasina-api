const mongoose = require('mongoose');

const personOptions = {
    discriminatorKey: 'persontype',
    collection: 'people',
}

const personSchema = mongoose.Schema({

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
    adress: {
        type: String,
        required: false,
    },
}, personOptions)

const Person = mongoose.model('PersonBase', personSchema);

module.exports = mongoose.model('Person',personSchema);