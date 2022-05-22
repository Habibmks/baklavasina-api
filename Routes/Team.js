const express = require('express');
const router = express.Router();

const t = require('../Functions/Team.js');

router.get('/all',t.getAll);

router.post('/create',t.createTeam);

router.get('team/:id',t.getTeam);

router.get('/byGender/:gender',t.findByGender);

router.get('/byName/:name',t.findByName);

router.get('/byState/:state',t.findByState);

module.exports = router;