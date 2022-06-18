const express = require('express');
const router = express.Router();

const t = require('../Functions/Team.js');

//tüm takımları dizi olarak gönderir
router.get('/all',t.getAll);

//personId ve teamName alır, photoUrl
//takımı nesne olarak gönderir
router.post('/create',t.createTeam);

//id ile team'i nesne olarak gönderir
router.get('/:id',t.getTeam);

//id ile sadece takım döndürür
router.get('/gett/:id',t.gettTeam);

//returns team players' information
router.get('/gett/players/:id',t.gettPlayers);

//gender değerini boolean olarak alır (true for male)
//takımı dizi olarak gönderir []
router.get('/byGender/:gender',t.findByGender);


router.get('/delete/:teamId',t.del);

//name değerini alır
//takımları dizi olarak gönderir []
router.get('/byName/:name',t.findByName);

//city değerini alır
//takımları şehre göre dizi olarak gönderir []
router.get('/byCity/:city',t.findByCity);

router.get('/byState/:state',t.findByState);

module.exports = router;