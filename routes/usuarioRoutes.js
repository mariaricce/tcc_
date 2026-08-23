const express = require('express');

const router = express.Router();

const usuarioController =
    require('../controllers/usuarioController');

const authMiddleware =
    require('../middlewares/authMiddleware');


router.get(
    '/usuario',
    authMiddleware.autenticado,
    usuarioController.painel
);


module.exports = router;