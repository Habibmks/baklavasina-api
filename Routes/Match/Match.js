const express = require('express');
const router = express.Router();

const t = require('../../Functions/Team.js');
const { route } = require('../Person/PersonRoute');

router.post('/create',t.matchRequest);

module.exports = router;