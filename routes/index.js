const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController.js')

/* GET home page. */
router.get('/', indexController.index)

router.get('/cadastrar', indexController.create)

router.post('/cadastrar', indexController.store)

router.get('/pizza/:id', indexController.pizza)

module.exports = router

