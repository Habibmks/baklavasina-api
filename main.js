const mongoose = require('mongoose');
const http = require('http');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
var allowedOrigins = [
    'http://localhost:8200',
    'http://127.0.0.1:8200',
    "http://baklavasina:8000",
    "http://172.104.140.216:8080",
];
app.use(cors({
    origin: function (origin, callback) {    // allow requests with no origin 
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true); if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        } return callback(null, true);
    }
}));

const personRoute = require('./Routes/PersonRoute.js');
const teamRoute = require('./Routes/Team.js');
const matchRoute = require('./Routes/Match.js');
const fieldRoute = require('./Routes/Field.js');
const tournamentRoute = require('./Routes/Tournament.js');

app.use('/person', personRoute);
app.use('/team', teamRoute);
app.use('/match', matchRoute);
app.use('/field', fieldRoute);
app.use('/tournament', tournamentRoute);


mongoose.connect("mongodb://127.0.0.1:27017/localhost?connectTimeoutMS=1000").then(() => {
    console.log('connected succesfully')
}).catch(e => console.log(e));

app.get('/', (req, res) => {
    res.send('You did it!!! Welcome :)');
});

/*
mongoose.connect("mongodb://127.0.0.1:27017/localhost?connectionTimeoutMS=2000", { useNewUrlParser: true }, (err) => {
    if (err) return console.log(err.message);

    console.log('connected succesfully');
});
*/

app.listen(3000, () => console.log('listening on port 3000'));