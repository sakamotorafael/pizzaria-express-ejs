const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController')

/* GET users listing. */
router.get('/login', usersController.login)
router.post('/login', usersController.auth)
router.get('/menu', usersController.menu)

module.exports = router
