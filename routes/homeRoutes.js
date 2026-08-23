const express = require('express');

const router = express.Router();

const homeController = require('../controllers/homeController');


router.get('/', homeController.home);

router.get('/sobre', homeController.sobre);

router.get('/como-ajudar', homeController.comoAjudar);

router.get('/contato', homeController.contato);

router.post('/contato', homeController.enviarContato);


module.exports = router;