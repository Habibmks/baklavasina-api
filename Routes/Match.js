const express = require('express');
const router = express.Router();

const t = require('../Functions/Team.js');
const m = require('../Functions/Match.js');

//homeId, guestId, type, saha değişkenlerini alır
//type değişkenine göre ek parametler de alır
//(easy, league, prepare, tournament)
//prepare: observer
//league: referee, observer
//tournament: referee, observer
router.post('/create',t.matchRequest);

//id değişkenini alır
//maç'ı nesne olarak gönderir
router.get('/match/:id',m.getMatch);

//homeId, guestId, type, saha değişkenlerini alır
//type değişkenine göre ek parametler de alır
//(easy, league, prepare, tournament)
//prepare: observer
//league: referee, observer
//tournament: referee, observer
//guest olarak belirtilen takıma maç isteği atar takım kabul ederse maç oluşturulur
router.post('/invite',t.matchRequest);

//teamId ve inviteId alır 
//maç'ı nesne olarak gönderir {}
router.post('/acceptInvite',t.acceptInvite);

//teamId ve inviteId alır
//takımın davetlerini dizi olarak geri gönderir []
router.post('/rejectInvite',t.rejectInvite);

//tüm maçları dizi olarak gönderir []
router.get('/all',m.getAll);

//belediye içindeki maçları dizi olarak gönderir []
router.get('/byState',m.findByState);

module.exports = router;