const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController.js')
const upload = require('../middleware/upload')

/* GET home page. */
router.get('/', indexController.index)

router.get('/cadastrar', indexController.create)
router.post('/cadastrar', upload.any(), indexController.store)

router.get('/pizza/:id', indexController.pizza)

router.get('/editar/:id', indexController.edit)
router.put('/editar/:id', upload.any(), indexController.update)

module.exports = router

