const express = require('express');
const router = express.Router();

const atendimentoController =
    require('../controllers/atendimentoController');

const authMiddleware =
    require('../middlewares/authMiddleware');


router.get(
    '/admin/atendimentos',
    authMiddleware.somenteAdmin,
    atendimentoController.listar
);


router.get(
    '/admin/atendimentos/novo',
    authMiddleware.somenteAdmin,
    atendimentoController.exibirNovo
);


router.post(
    '/admin/atendimentos/novo',
    authMiddleware.somenteAdmin,
    atendimentoController.criar
);


router.get(
    '/admin/atendimentos/:id/editar',
    authMiddleware.somenteAdmin,
    atendimentoController.exibirEditar
);


router.post(
    '/admin/atendimentos/:id/editar',
    authMiddleware.somenteAdmin,
    atendimentoController.atualizar
);


router.post(
    '/admin/atendimentos/:id/excluir',
    authMiddleware.somenteAdmin,
    atendimentoController.excluir
);


module.exports = router;