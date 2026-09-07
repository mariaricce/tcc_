const express = require('express');

const router = express.Router();

const campanhaController =
    require('../controllers/campanhaController');

const authMiddleware =
    require('../middlewares/authMiddleware');

const uploadCampanha =
    require('../config/uploadCampanha');


// ========================================
// PÁGINA PÚBLICA
// ========================================

router.get(
    '/campanhas',
    campanhaController.publicas
);


// ========================================
// ADMINISTRAÇÃO
// ========================================

// LISTAR CAMPANHAS

router.get(
    '/admin/campanhas',
    authMiddleware.somenteAdmin,
    campanhaController.listar
);


// NOVA CAMPANHA

router.get(
    '/admin/campanhas/nova',
    authMiddleware.somenteAdmin,
    campanhaController.exibirNova
);


// CADASTRAR CAMPANHA

router.post(
    '/admin/campanhas/nova',
    authMiddleware.somenteAdmin,
    uploadCampanha.single('imagem'),
    campanhaController.criar
);


// EDITAR CAMPANHA

router.get(
    '/admin/campanhas/:id/editar',
    authMiddleware.somenteAdmin,
    campanhaController.exibirEditar
);


// SALVAR EDIÇÃO

router.post(
    '/admin/campanhas/:id/editar',
    authMiddleware.somenteAdmin,
    uploadCampanha.single('imagem'),
    campanhaController.atualizar
);


// EXCLUIR CAMPANHA

router.post(
    '/admin/campanhas/:id/excluir',
    authMiddleware.somenteAdmin,
    campanhaController.excluir
);


module.exports = router;