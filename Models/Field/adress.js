const mongoose = require('mongoose');

const adressSchema = mongoose.Schema({
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
        required: true,
    },
    //boylam
    longitude:{
        type: String,
        required: true,
    },
});

const Adress = mongoose.model('Adress',adressSchema);

module.exports = Adress;