const mongoose = require('mongoose');

const fieldSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    //Adress id
    adress: {
        country:{
            type: String,
            required: true,
        },
        city:{
            type: String,
            required: true,
        },
        council:{
            type: String,
            required: true,
        },
        neighborhood:{
            type: String,
            required: true,
        },
        street:{
            type: String,
            required: true,
        },
        no:{
            type: String,
            required: true,
        },
        //enlem
        latitude:{
            type: String,
            required: false,
        },
        //boylam
        longitude:{
            type: String,
            required: false,
        },
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
});

const Field = mongoose.model('Field', fieldSchema);

module.exports = Field;