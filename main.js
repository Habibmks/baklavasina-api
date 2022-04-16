const mongoose = require('mongoose');
const http = require('http');
const express = require('express');


const { get } = require('express/lib/response');
const env = require('dotenv/config');
const jwt = require('jsonwebtoken');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const playerRoute = require('./Routes/Person/PlayerRoute.js');
const refereeRoute = require('./Routes/Person/RefereeRoute.js');
app.use('/person/referee',refereeRoute);
app.use('/person/player',playerRoute);

/*
mongoose.connect("mongodb://127.0.0.1:27017/localhost?connectTimeoutMS=1000", { useNewUrlParser: true }, (err) => {
    if (err) return console.log(err.message);

    console.log('connected succesfully');
});
*/

mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.3.1", { useNewUrlParser: true }, (err) => {
    if (err) return console.log(err.message);

    console.log('connected succesfully');
});


app.listen(3000, () => console.log('listening on port 3000'));
