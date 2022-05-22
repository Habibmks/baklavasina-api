const express = require('express');
const router=express.Router();

const l=require('../Functions/League.js');

router.patch('/join',l.join);

router.get('/all',l.getAll);

router.get('/:id',l.league);

module.exports = router;