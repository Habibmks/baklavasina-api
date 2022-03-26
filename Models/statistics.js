const mongoose = require('mongoose');

const statisticsSchema = mongoose.Schema({
    statistics: {
        type: Number,
        required: true,
    },
});

const Statistics = mongoose.model('Statistics', statisticsSchema);

module.exports = Statistics;