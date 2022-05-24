const mongoose = require('mongoose');

const fieldSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    country: String,
    city: String,
    council: String,
    neighborhood: String,
    street: String,
    no: String,
    //enlem
    latitude: String,
    //boylam
    longitude: String,
    phoneNumber: {
        type: Number,
        required: true,
    },
});

const Field = mongoose.model('Field', fieldSchema);

module.exports = Field;