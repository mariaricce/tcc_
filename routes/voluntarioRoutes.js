const express = require('express');

const router = express.Router();

const voluntarioController =
    require('../controllers/voluntarioController');

const authMiddleware =
    require('../middlewares/authMiddleware');


// =====================================
// ROTAS PÚBLICAS
// =====================================

router.get(
    '/quero-ser-voluntario',
    voluntarioController.exibirFormularioPublico
);


router.post(
    '/quero-ser-voluntario',
    voluntarioController.cadastrarPublico
);


// =====================================
// ROTAS ADMIN
// =====================================

router.get(
    '/admin/voluntarios',
    authMiddleware.somenteAdmin,
    voluntarioController.listar
);


router.get(
    '/admin/voluntarios/novo',
    authMiddleware.somenteAdmin,
    voluntarioController.exibirNovo
);


router.post(
    '/admin/voluntarios/novo',
    authMiddleware.somenteAdmin,
    voluntarioController.criar
);


router.get(
    '/admin/voluntarios/:id/editar',
    authMiddleware.somenteAdmin,
    voluntarioController.exibirEditar
);


router.post(
    '/admin/voluntarios/:id/editar',
    authMiddleware.somenteAdmin,
    voluntarioController.atualizar
);


router.post(
    '/admin/voluntarios/:id/excluir',
    authMiddleware.somenteAdmin,
    voluntarioController.excluir
);


module.exports = router;