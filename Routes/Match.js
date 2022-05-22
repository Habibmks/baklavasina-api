const express = require('express');
const router = express.Router();

const t = require('../Functions/Team.js');
const m = require('../Functions/Match.js');

router.post('/create',t.matchRequest);

router.get('/match/:id',m.getMatch);

router.post('/invite',t.matchRequest);

router.post('/acceptInvite',t.acceptInvite);

router.post('/rejectInvite',t.rejectInvite);

router.get('/all',m.getAll);

router.get('/byState',m.findByState);

module.exports = router;