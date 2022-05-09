const mongoose = require('mongoose');

const transferSchema = mongoose.Schema({
    sender: {
        type: String,
        required: true,
    },
    receiver: {
        type: String,
        required: true,
    },
    player: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

const Transfer = mongoose.model('Transfer',transferSchema);

module.exports = mongoose.model('Transfer',transferSchema);