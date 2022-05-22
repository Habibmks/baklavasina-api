const express = require('express');
const router = express.Router();

const p = require('../Functions/Person.js');

router.get('/all', p.getAll);

router.get('/get/:id', p.getPerson);

router.patch('/teamInvite', p.teamRequest);

router.get('/invites/:id', p.invites);

router.patch('/acceptInvite', p.acceptInvite);

router.patch('/rejectInvite', p.rejectInvite);

router.post('/register', p.register);

router.post('/login', p.login);

router.patch('/update', p.update);

router.patch('/referee/add',p.newReferee);

router.patch('/referee/remove',p.resetReferee);

router.patch('/observer/add',p.newObserver);

router.patch('/observer/remove',p.resetObserver);

module.exports = router;