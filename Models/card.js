const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
    //true ise sarı kart
    color: {
        type: Boolean,
        required: true,
    },
    match: {
        type: String,
        required: true,
    },
    player: {
        type: String,
        required: true,
    },
    penalty: {
        type: Boolean,
        required: true,
    },
    team: {
        type: String,
        required: true,
    },
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;