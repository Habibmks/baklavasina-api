const mongoose = require('mongoose');

const goalScheam = mongoose.Schema({
    minute: {
        type: String,
        required: false,
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
    assist: String,
});

const Goal = mongoose.model('Goal', goalScheam);

module.exports = Goal;