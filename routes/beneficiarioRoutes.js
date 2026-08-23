const express = require('express');

const router = express.Router();

const beneficiarioController =
    require('../controllers/beneficiarioController');

const authMiddleware =
    require('../middlewares/authMiddleware');


router.get(
    '/admin/beneficiarios',
    authMiddleware.somenteAdmin,
    beneficiarioController.listar
);


router.get(
    '/admin/beneficiarios/novo',
    authMiddleware.somenteAdmin,
    beneficiarioController.exibirNovo
);


router.post(
    '/admin/beneficiarios/novo',
    authMiddleware.somenteAdmin,
    beneficiarioController.criar
);


router.get(
    '/admin/beneficiarios/:id/editar',
    authMiddleware.somenteAdmin,
    beneficiarioController.exibirEditar
);


router.post(
    '/admin/beneficiarios/:id/editar',
    authMiddleware.somenteAdmin,
    beneficiarioController.atualizar
);


router.post(
    '/admin/beneficiarios/:id/excluir',
    authMiddleware.somenteAdmin,
    beneficiarioController.excluir
);


module.exports = router;