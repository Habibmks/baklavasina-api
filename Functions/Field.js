const fieldModel = require('../Models/Field/field.js');
const addressModel = require('../Models/Field/adress.js');

const mongoose = require('mongoose');

const getAll = async (req, res) => {
    return res.send(await fieldModel.find());
}

const create = async (req, res) => {
    const { name, phoneNumber, country, city, council, neighborhood, street, no } = req.body;
    const address = new addressModel({
        country: country,
        city: city,
        council: council,
        neighborhood: neighborhood,
        street: street,
        no: no,
    });
    const field = new fieldModel({
        name: name,
        country: country,
        city: city,
        council: council,
        neighborhood: neighborhood,
        street: street,
        no: no,
        phoneNumber: phoneNumber,
    })
    await field.save();
    return res.send(field);
}

const fieldByCity = async (req, res) => {
    const { city } = req.params;
    const fields = await fieldModel.find({ city: city });
    return res.send(fields);
}

const fieldByState = async (req, res) => {
    const { city, state } = req.params;
    const fields = await fieldModel.find({ city: city, state: state });
    return res.send(fields);
}

module.exports = { create, getAll, fieldByCity };