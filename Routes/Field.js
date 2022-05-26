const express = require('express');
const router = express.Router();

const f = require('../Functions/Field.js');

//tüm sahaları dizi şeklinde dönderir []
router.get('/getAll',f.getAll);

//name, phoneNumber, country, city, council, neighborhood, street, no
//değerlerini alır
//sahayı nesne olarak geri gönderir
router.post('/create',f.create);

//şehir olarak city değişkeni alır
//saha'yı nesne olarak gönderir {}
router.get('/findCity/:state',f.fieldByCity);

module.exports = router;