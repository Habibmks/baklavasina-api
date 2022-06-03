const mongoose = require('mongoose');

const matchOptions = {
    discriminatorKey: 'matchtype',
    collection: 'match',
}

const macthSchema = mongoose.Schema({
    type: String,
    //Maç başlama tarihi saati
    startDate: {
        type: Date,
    },
    //Halısaha
    field: {
        type: String,
    },
    //Maçtaki kartlar
    cards: [
        {
            type: String,
        }
    ],
    played: {
        type: Boolean,
    },
    home: {
        type: String,
    },
    guest: {
        type: String,
    },
    team1Goals: [
        mongoose.ObjectId,
    ],
    team2Goals: [
        mongoose.ObjectId,
    ],
    winner: {
        teamid: {
            type: String,
        }
    },
    city: String,
    state: String,
    observers: [
        {
            observer: String,
        }
    ],
    referees: [
        {
            referee: {
                type: String,
            }
        }
    ],
    league: {
        type: String,
    },
    points: {
        type: Number,
    },
    tournament: {
        type: String,
    },
    homePlayers:[
        String,
    ],
    guestPlayers:[
        String,
    ]
}, matchOptions);

const Match = mongoose.model('MatchBase', macthSchema);

module.exports = mongoose.model('Match', macthSchema);
