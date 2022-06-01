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

router.get('/get/all',m.getAll);

router.get('/get/easy',m.getMatch);

router.get('/get/prepare',m.getMatch);

router.get('/get/tournament',m.getMatch);

router.get('/get/league',m.getMatch);

//matchId (id) ile belirtilen maça ait 
//maç'ı ev sahibi ve deplasman takımlarını ve takımların oyuncularını gönderir
router.get('/get/:id',m.getMatch);

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

//teamId, personId, matchId, minute, penalty (bool)
//returns goal
router.post('/add/goal',m.addGoal);

module.exports = router;