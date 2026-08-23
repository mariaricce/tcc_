const express = require('express');

const router = express.Router();

const campanhaController =
    require('../controllers/campanhaController');

const authMiddleware =
    require('../middlewares/authMiddleware');


// Página pública
router.get(
    '/campanhas',
    campanhaController.publicas
);


// Administração
router.get(
    '/admin/campanhas',
    authMiddleware.somenteAdmin,
    campanhaController.listar
);


router.get(
    '/admin/campanhas/nova',
    authMiddleware.somenteAdmin,
    campanhaController.exibirNova
);


router.post(
    '/admin/campanhas/nova',
    authMiddleware.somenteAdmin,
    campanhaController.criar
);


router.get(
    '/admin/campanhas/:id/editar',
    authMiddleware.somenteAdmin,
    campanhaController.exibirEditar
);


router.post(
    '/admin/campanhas/:id/editar',
    authMiddleware.somenteAdmin,
    campanhaController.atualizar
);


router.post(
    '/admin/campanhas/:id/excluir',
    authMiddleware.somenteAdmin,
    campanhaController.excluir
);


module.exports = router;