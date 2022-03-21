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


mongoose.connect("mongodb://127.0.0.1:27017/localhost?connectTimeoutMS=1000", { useNewUrlParser: true }, (err) => {
    if (err) return console.log(err.message);

    console.log('connected succesfully');
});

// mongoose.connect("mongodb+srv://doadmin:394r78I65fe1FdkG@db-mongodb-nyc3-60882-2a167b96.mongo.ondigitalocean.com/admin?authSource=admin&replicaSet=db-mongodb-nyc3-60882&tls=true&tlsCAFile=ca-certificate.crt", { useNewUrlParser: true }, (err) => {
//     if (err) return console.log(err.message);

//     console.log('connected succesfully');
// });

app.listen(3000, () => console.log('listening on port 3000'));
