const express = require('express');
const router = express.Router();

const participacaoController =
    require('../controllers/participacaoController');

const authMiddleware =
    require('../middlewares/authMiddleware');


router.get(
    '/admin/participacoes',
    authMiddleware.somenteAdmin,
    participacaoController.listar
);


router.get(
    '/admin/participacoes/nova',
    authMiddleware.somenteAdmin,
    participacaoController.exibirNova
);


router.post(
    '/admin/participacoes/nova',
    authMiddleware.somenteAdmin,
    participacaoController.criar
);


router.get(
    '/admin/participacoes/:id/editar',
    authMiddleware.somenteAdmin,
    participacaoController.exibirEditar
);


router.post(
    '/admin/participacoes/:id/editar',
    authMiddleware.somenteAdmin,
    participacaoController.atualizar
);


router.post(
    '/admin/participacoes/:id/excluir',
    authMiddleware.somenteAdmin,
    participacaoController.excluir
);


module.exports = router;