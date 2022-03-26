const mongoose = require('mongoose');

const fieldSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    //Adress id
    adress: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
});

const Field = mongoose.model('Field', fieldSchema);

module.exports = Field;