const express = require('express');
const router=express.Router();

const to=require('../Functions/Tournament.js');

//name ve teams olarak isim ve katılacak takımların id'lerini alır
//tournament'i nesne olarak gönderir {}
router.post('/create',to.create);

//tournamentId ve teamId alır
//takımı turnuvaya turnuvayı takıma ekler
//tournament'i nesne olarak gönderir
router.patch('/join',to.join);

//turnuva id'si olarak id alır 
//turnuvadaki takımların id'lerini dizi olarak gönderir
router.get('/teams/:id',to.teams);

//maçların id'si olarak id alır
//turnuvadaki maçların id'lerini dizi olarak gönderir
router.get('/matches/:id',to.matches);

//turnuva id'si olarak id alır
//tournament'i nesne olarak gönderir {}
router.get('/get/:id',to.tournament);

module.exports = router;  