const express = require('express');
const router = express.Router();

const doacaoController =
    require('../controllers/doacaoController');

const authMiddleware =
    require('../middlewares/authMiddleware');


// LISTAR DOAÇÕES
router.get(
    '/admin/doacoes',
    authMiddleware.somenteAdmin,
    doacaoController.listar
);


// NOVA DOAÇÃO
router.get(
    '/admin/doacoes/nova',
    authMiddleware.somenteAdmin,
    doacaoController.exibirNova
);


// CADASTRAR DOAÇÃO
router.post(
    '/admin/doacoes/nova',
    authMiddleware.somenteAdmin,
    doacaoController.criar
);


// EDITAR DOAÇÃO
router.get(
    '/admin/doacoes/:id/editar',
    authMiddleware.somenteAdmin,
    doacaoController.exibirEditar
);


// SALVAR EDIÇÃO
router.post(
    '/admin/doacoes/:id/editar',
    authMiddleware.somenteAdmin,
    doacaoController.atualizar
);


// EXCLUIR DOAÇÃO
router.post(
    '/admin/doacoes/:id/excluir',
    authMiddleware.somenteAdmin,
    doacaoController.excluir
);


module.exports = router;