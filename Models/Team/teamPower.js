const mongoose = require('mongoose');

const teamPowerSchema = mongoose.Schema({
    teamPower: {
        type: Number,
        required: true,
    },
});

const TeamPower = mongoose.model('TeamPower', teamPowerSchema);

module.exports = TeamPower;