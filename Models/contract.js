const mongoose = require('mongoose');

const contractSchema = mongoose.Schema({
    validity: {
        type: Boolean,
        required: true,
    },
    player: {
        type: String,
        required: true,
    },
    team: {
        type: String,
        required: true,
    },
    startdate: {
        type: Date,
        default: Date.now,
    },
});

const Contract = mongoose.model('Contract', contractSchema);

module.exports = Contract;