const express = require('express');
const router = express.Router();

const p = require('../Functions/Person.js');

//tüm kullanıcıları dizi olarak gönderir []
router.get('/all', p.getAll);

//firebase id ile kullanıcıyı nesne olarak gönderir {}
router.get('/get/:id', p.getPerson);

//teamId personId uniformNo ve position değişkenleri ile
//takım kaptanı bir oyuncuya takıma katılma daveti gönderir
//davet gönderilen kişiyi nesne olarak gönderir {}
router.patch('/teamInvite', p.teamRequest);

//kişinin id'sini id olarak alıp
//davetleri dizi olarak gönderir []
router.get('/invites/:id', p.invites);

//kişi id'sini id olarak alıp inviteId ile
//oyuncu davet gönderen takıma eklenir
//takım, oyuncunun takımına eklenir
//invites, transfers, ve team geri nesne olarak gönderilir {}
router.patch('/acceptInvite', p.acceptInvite);

//id ve inviteId alıp
//belirtilen invite'ı silip
//kalan invite'ları dizi olarak gönderir []
router.patch('/rejectInvite', p.rejectInvite);

//name, surnama, email, id, gender(true for male), favTeam ve position alır
//nesne içinde name, id, surname, email gönderir
router.post('/register', p.register);

//kullanılmayacak
router.post('/login', p.login);

//name, surname, email, id, birthday, telNo, favTeam alır
//kişiyi nesne olarak gönderir {}
router.patch('/update', p.update);

//referee type true yapar
//kişiyi nesne olarak gönderir {}
router.patch('/referee/add',p.newReferee);

//referee type false yapar
//kişiyi nesne olarak gönderir {}
router.patch('/referee/remove',p.resetReferee);

//observer type true yapar
//kişiyi nesne olarak gönderir
router.patch('/observer/add',p.newObserver);

//observer type false yapar
//kişiyi nesne olarak gönderir
router.patch('/observer/remove',p.resetObserver);

module.exports = router;