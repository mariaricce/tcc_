const Atendimento =
    require('../models/Atendimento');

const Beneficiario =
    require('../models/Beneficiario');

const Campanha =
    require('../models/Campanha');


// ===============================
// LISTAR
// ===============================

exports.listar = async (req, res) => {

    try {

        const atendimentos =
            await Atendimento.listarTodos();

        res.render('atendimentos/index', {

            titulo:
                'Atendimentos | Instituto Solidarize',

            atendimentos

        });

    } catch (erro) {

        console.error(
            'Erro ao listar atendimentos:',
            erro
        );

        res.status(500).send(
            'Erro ao listar atendimentos.'
        );

    }

};


// ===============================
// EXIBIR NOVO
// ===============================

exports.exibirNovo = async (req, res) => {

    try {

        const beneficiarios =
            await Beneficiario.listarTodos();

        const campanhas =
            await Campanha.listarTodas();

        res.render('atendimentos/novo', {

            titulo:
                'Novo Atendimento | Instituto Solidarize',

            beneficiarios,
            campanhas,
            erro: null

        });

    } catch (erro) {

        console.error(
            'Erro ao abrir formulário:',
            erro
        );

        res.status(500).send(
            'Erro ao carregar formulário.'
        );

    }

};


// ===============================
// CRIAR
// ===============================

exports.criar = async (req, res) => {

    try {

        const {
            beneficiario_id,
            campanha_id,
            tipo_atendimento,
            descricao,
            data_atendimento,
            status
        } = req.body;


        if (
            !beneficiario_id ||
            !tipo_atendimento ||
            !data_atendimento ||
            !status
        ) {

            const beneficiarios =
                await Beneficiario.listarTodos();

            const campanhas =
                await Campanha.listarTodas();


            return res.render(
                'atendimentos/novo',
                {

                    titulo:
                        'Novo Atendimento | Instituto Solidarize',

                    beneficiarios,
                    campanhas,

                    erro:
                        'Preencha os campos obrigatórios.'

                }
            );

        }


        await Atendimento.criar(
            beneficiario_id,
            campanha_id,
            tipo_atendimento,
            descricao,
            data_atendimento,
            status
        );


        res.redirect(
            '/admin/atendimentos'
        );


    } catch (erro) {

        console.error(
            'Erro ao cadastrar atendimento:',
            erro
        );

        res.status(500).send(
            'Erro ao cadastrar atendimento.'
        );

    }

};


// ===============================
// EXIBIR EDITAR
// ===============================

exports.exibirEditar = async (req, res) => {

    try {

        const atendimento =
            await Atendimento.buscarPorId(
                req.params.id
            );


        if (!atendimento) {

            return res.status(404).send(
                'Atendimento não encontrado.'
            );

        }


        const beneficiarios =
            await Beneficiario.listarTodos();

        const campanhas =
            await Campanha.listarTodas();


        res.render(
            'atendimentos/editar',
            {

                titulo:
                    'Editar Atendimento | Instituto Solidarize',

                atendimento,
                beneficiarios,
                campanhas,
                erro: null

            }
        );


    } catch (erro) {

        console.error(
            'Erro ao carregar atendimento:',
            erro
        );

        res.status(500).send(
            'Erro ao carregar atendimento.'
        );

    }

};


// ===============================
// ATUALIZAR
// ===============================

exports.atualizar = async (req, res) => {

    try {

        const {
            beneficiario_id,
            campanha_id,
            tipo_atendimento,
            descricao,
            data_atendimento,
            status
        } = req.body;


        if (
            !beneficiario_id ||
            !tipo_atendimento ||
            !data_atendimento ||
            !status
        ) {

            const atendimento =
                await Atendimento.buscarPorId(
                    req.params.id
                );

            const beneficiarios =
                await Beneficiario.listarTodos();

            const campanhas =
                await Campanha.listarTodas();


            return res.render(
                'atendimentos/editar',
                {

                    titulo:
                        'Editar Atendimento | Instituto Solidarize',

                    atendimento,
                    beneficiarios,
                    campanhas,

                    erro:
                        'Preencha os campos obrigatórios.'

                }
            );

        }


        await Atendimento.atualizar(
            req.params.id,
            beneficiario_id,
            campanha_id,
            tipo_atendimento,
            descricao,
            data_atendimento,
            status
        );


        res.redirect(
            '/admin/atendimentos'
        );


    } catch (erro) {

        console.error(
            'Erro ao atualizar atendimento:',
            erro
        );

        res.status(500).send(
            'Erro ao atualizar atendimento.'
        );

    }

};


// ===============================
// EXCLUIR
// ===============================

exports.excluir = async (req, res) => {

    try {

        await Atendimento.excluir(
            req.params.id
        );

        res.redirect(
            '/admin/atendimentos'
        );


    } catch (erro) {

        console.error(
            'Erro ao excluir atendimento:',
            erro
        );

        res.status(500).send(
            'Erro ao excluir atendimento.'
        );

    }

};