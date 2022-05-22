const express = require('express');
const router=express.Router();

const to=require('../Functions/Tournament.js');

router.post('/create',to.create);

router.patch('/join',to.join);

router.get('/teams/:id',to.teams);

router.get('/matches/:id',to.matches);

router.get('/get/:id',to.tournament);

module.exports = router;  