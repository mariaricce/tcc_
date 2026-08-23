const Doacao = require('../models/Doacao');
const Campanha = require('../models/Campanha');


// ========================================
// LISTAR DOAÇÕES
// ========================================

exports.listar = async (req, res) => {

    try {

        const doacoes = await Doacao.listarTodas();

        res.render('doacoes/index', {
            titulo: 'Gerenciar Doações | Instituto Solidarize',
            doacoes
        });

    } catch (erro) {

        console.error('Erro ao listar doações:', erro);

        res.status(500).send(
            'Erro ao listar doações.'
        );

    }

};


// ========================================
// EXIBIR NOVA DOAÇÃO
// ========================================

exports.exibirNova = async (req, res) => {

    try {

        const campanhas = await Campanha.listarTodas();

        res.render('doacoes/nova', {
            titulo: 'Nova Doação | Instituto Solidarize',
            campanhas,
            erro: null
        });

    } catch (erro) {

        console.error(
            'Erro ao abrir formulário de doação:',
            erro
        );

        res.status(500).send(
            'Erro ao carregar formulário.'
        );

    }

};


// ========================================
// CRIAR DOAÇÃO
// ========================================

exports.criar = async (req, res) => {

    try {

        const {
            doador_nome,
            tipo,
            descricao,
            quantidade,
            valor,
            data_doacao,
            campanha_id,
            status
        } = req.body;


        if (
            !doador_nome ||
            !tipo ||
            !data_doacao ||
            !status
        ) {

            const campanhas = await Campanha.listarTodas();

            return res.render('doacoes/nova', {

                titulo:
                    'Nova Doação | Instituto Solidarize',

                campanhas,

                erro:
                    'Preencha os campos obrigatórios.'

            });

        }


        await Doacao.criar(
            doador_nome,
            tipo,
            descricao,
            quantidade,
            valor,
            data_doacao,
            campanha_id,
            status
        );


        res.redirect('/admin/doacoes');


    } catch (erro) {

        console.error(
            'Erro ao cadastrar doação:',
            erro
        );

        res.status(500).send(
            'Erro ao cadastrar doação.'
        );

    }

};


// ========================================
// EXIBIR EDIÇÃO
// ========================================

exports.exibirEditar = async (req, res) => {

    try {

        const doacao = await Doacao.buscarPorId(
            req.params.id
        );


        if (!doacao) {

            return res.status(404).send(
                'Doação não encontrada.'
            );

        }


        const campanhas = await Campanha.listarTodas();


        res.render('doacoes/editar', {

            titulo:
                'Editar Doação | Instituto Solidarize',

            doacao,
            campanhas,
            erro: null

        });


    } catch (erro) {

        console.error(
            'Erro ao carregar doação:',
            erro
        );

        res.status(500).send(
            'Erro ao carregar doação.'
        );

    }

};


// ========================================
// ATUALIZAR DOAÇÃO
// ========================================

exports.atualizar = async (req, res) => {

    try {

        const {
            doador_nome,
            tipo,
            descricao,
            quantidade,
            valor,
            data_doacao,
            campanha_id,
            status
        } = req.body;


        if (
            !doador_nome ||
            !tipo ||
            !data_doacao ||
            !status
        ) {

            const doacao = await Doacao.buscarPorId(
                req.params.id
            );

            const campanhas = await Campanha.listarTodas();


            return res.render('doacoes/editar', {

                titulo:
                    'Editar Doação | Instituto Solidarize',

                doacao,
                campanhas,

                erro:
                    'Preencha os campos obrigatórios.'

            });

        }


        await Doacao.atualizar(
            req.params.id,
            doador_nome,
            tipo,
            descricao,
            quantidade,
            valor,
            data_doacao,
            campanha_id,
            status
        );


        res.redirect('/admin/doacoes');


    } catch (erro) {

        console.error(
            'Erro ao atualizar doação:',
            erro
        );

        res.status(500).send(
            'Erro ao atualizar doação.'
        );

    }

};


// ========================================
// EXCLUIR DOAÇÃO
// ========================================

exports.excluir = async (req, res) => {

    try {

        await Doacao.excluir(
            req.params.id
        );

        res.redirect('/admin/doacoes');


    } catch (erro) {

        console.error(
            'Erro ao excluir doação:',
            erro
        );

        res.status(500).send(
            'Erro ao excluir doação.'
        );

    }

};