const mongoose = require('mongoose');
const http = require('http');
const express = require('express');


const { get } = require('express/lib/response');
const env = require('dotenv/config');
const jwt = require('jsonwebtoken');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// const playerRoute = require('./Routes/Person/PlayerRoute.js');
// const refereeRoute = require('./Routes/Person/RefereeRoute.js');
const personRoute = require('./Routes/PersonRoute.js');
const teamRoute = require('./Routes/Team.js');
const matchRoute = require('./Routes/Match.js');
const fieldRoute = require('./Routes/Field.js');

// app.use('/person/referee',refereeRoute);
// app.use('/person/player',playerRoute);
app.use('/person',personRoute);
app.use('/team',teamRoute);
app.use('/match',matchRoute);
app.use('/field',fieldRoute);


mongoose.connect("mongodb://127.0.0.1:27017/localhost?connectTimeoutMS=1000").then(() => {
    console.log('connected succesfully')
}).catch(e => console.log(e));

app.get('/', (req,res) => {
    res.send('abc');
});

/*
mongoose.connect("mongodb://127.0.0.1:27017/localhost?connectionTimeoutMS=2000", { useNewUrlParser: true }, (err) => {
    if (err) return console.log(err.message);

    console.log('connected succesfully');
});
*/

app.listen(3000, () => console.log('listening on port 3000'));