const express = require('express');
const router = express.Router();

const m = require('../../Functions/Team.js');

router.get('/all',m.getAll);

router.post('/create',m.createTeam);

module.exports = router;