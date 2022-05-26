const express = require('express');
const router=express.Router();

const l=require('../Functions/League.js');

//leagueId ve teamId alır takımı lige ekler,
//league nesne olarak gönderir {}
router.patch('/join',l.join);

//tüm ligleri dizi olarak gönderir []
router.get('/all',l.getAll);

//id'si verilen ligi nesne olarak geri gönderir
router.get('/:id',l.league);

module.exports = router;