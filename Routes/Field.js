const express = require('express');
const router = express.Router();

const f = require('../Functions/Field.js');

router.get('/getAll',f.getAll);

router.post('/create',f.create);

router.get('/findState/:state',f.fieldByCity);

module.exports = router;