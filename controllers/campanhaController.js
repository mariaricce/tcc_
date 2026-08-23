const Campanha = require('../models/Campanha');


// =============================
// PÁGINA PÚBLICA
// =============================

exports.publicas = async (req, res) => {

    try {

        const campanhas =
            await Campanha.listarAtivas();

        res.render('campanhas', {
            titulo: 'Campanhas | Instituto Solidarize',
            campanhas
        });

    } catch (erro) {

        console.error(
            'Erro ao carregar campanhas:',
            erro
        );

        res.status(500).send(
            'Erro ao carregar campanhas.'
        );
    }

};


// =============================
// LISTAR NO ADMIN
// =============================

exports.listar = async (req, res) => {

    try {

        const campanhas =
            await Campanha.listarTodas();

        res.render('campanhas/index', {
            titulo: 'Gerenciar Campanhas | Instituto Solidarize',
            campanhas
        });

    } catch (erro) {

        console.error(
            'Erro ao listar campanhas:',
            erro
        );

        res.status(500).send(
            'Erro ao listar campanhas.'
        );
    }

};


// =============================
// FORMULÁRIO NOVA CAMPANHA
// =============================

exports.exibirNova = (req, res) => {

    res.render('campanhas/nova', {
        titulo: 'Nova Campanha | Instituto Solidarize',
        erro: null
    });

};


// =============================
// CADASTRAR
// =============================

exports.criar = async (req, res) => {

    try {

        const {
            titulo,
            descricao,
            data_inicio,
            data_fim,
            meta,
            status
        } = req.body;


        if (!titulo || !descricao || !data_inicio || !status) {

            return res.render('campanhas/nova', {

                titulo: 'Nova Campanha | Instituto Solidarize',

                erro: 'Preencha os campos obrigatórios.'

            });

        }


        await Campanha.criar(
            titulo,
            descricao,
            data_inicio,
            data_fim,
            meta,
            status
        );


        res.redirect('/admin/campanhas');


    } catch (erro) {

        console.error(
            'Erro ao cadastrar campanha:',
            erro
        );


        res.render('campanhas/nova', {

            titulo: 'Nova Campanha | Instituto Solidarize',

            erro: 'Não foi possível cadastrar a campanha.'

        });
    }

};


// =============================
// FORMULÁRIO EDITAR
// =============================

exports.exibirEditar = async (req, res) => {

    try {

        const campanha =
            await Campanha.buscarPorId(req.params.id);


        if (!campanha) {

            return res.status(404).send(
                'Campanha não encontrada.'
            );
        }


        res.render('campanhas/editar', {

            titulo: 'Editar Campanha | Instituto Solidarize',

            campanha,

            erro: null

        });


    } catch (erro) {

        console.error(
            'Erro ao carregar campanha:',
            erro
        );

        res.status(500).send(
            'Erro ao carregar campanha.'
        );
    }

};


// =============================
// ATUALIZAR
// =============================

exports.atualizar = async (req, res) => {

    try {

        const {
            titulo,
            descricao,
            data_inicio,
            data_fim,
            meta,
            status
        } = req.body;


        if (!titulo || !descricao || !data_inicio || !status) {

            const campanha =
                await Campanha.buscarPorId(req.params.id);


            return res.render('campanhas/editar', {

                titulo: 'Editar Campanha | Instituto Solidarize',

                campanha,

                erro: 'Preencha os campos obrigatórios.'

            });

        }


        await Campanha.atualizar(
            req.params.id,
            titulo,
            descricao,
            data_inicio,
            data_fim,
            meta,
            status
        );


        res.redirect('/admin/campanhas');


    } catch (erro) {

        console.error(
            'Erro ao atualizar campanha:',
            erro
        );


        res.status(500).send(
            'Erro ao atualizar campanha.'
        );
    }

};


// =============================
// EXCLUIR
// =============================

exports.excluir = async (req, res) => {

    try {

        await Campanha.excluir(
            req.params.id
        );


        res.redirect('/admin/campanhas');


    } catch (erro) {

        console.error(
            'Erro ao excluir campanha:',
            erro
        );


        res.status(500).send(
            'Erro ao excluir campanha.'
        );
    }

};