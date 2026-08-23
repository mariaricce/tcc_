const Participacao =
    require('../models/Participacao');

const Voluntario =
    require('../models/Voluntario');

const Campanha =
    require('../models/Campanha');


// LISTAR
exports.listar = async (req, res) => {

    try {

        const participacoes =
            await Participacao.listarTodas();

        res.render('participacoes/index', {

            titulo:
                'Participações | Instituto Solidarize',

            participacoes

        });

    } catch (erro) {

        console.error(
            'Erro ao listar participações:',
            erro
        );

        res.status(500).send(
            'Erro ao listar participações.'
        );

    }

};


// NOVA
exports.exibirNova = async (req, res) => {

    try {

        const voluntarios =
            await Voluntario.listarTodos();

        const campanhas =
            await Campanha.listarTodas();


        res.render('participacoes/nova', {

            titulo:
                'Nova Participação | Instituto Solidarize',

            voluntarios,
            campanhas,
            erro: null

        });

    } catch (erro) {

        console.error(erro);

        res.status(500).send(
            'Erro ao carregar formulário.'
        );

    }

};


// CRIAR
exports.criar = async (req, res) => {

    try {

        const {
            voluntario_id,
            campanha_id,
            status
        } = req.body;


        if (
            !voluntario_id ||
            !campanha_id ||
            !status
        ) {

            const voluntarios =
                await Voluntario.listarTodos();

            const campanhas =
                await Campanha.listarTodas();


            return res.render(
                'participacoes/nova',
                {
                    titulo:
                        'Nova Participação | Instituto Solidarize',

                    voluntarios,
                    campanhas,

                    erro:
                        'Preencha todos os campos.'
                }
            );

        }


        await Participacao.criar(
            voluntario_id,
            campanha_id,
            status
        );


        res.redirect(
            '/admin/participacoes'
        );


    } catch (erro) {

        console.error(
            'Erro ao cadastrar participação:',
            erro
        );

        res.status(500).send(
            'Erro ao cadastrar participação.'
        );

    }

};


// EDITAR
exports.exibirEditar = async (req, res) => {

    try {

        const participacao =
            await Participacao.buscarPorId(
                req.params.id
            );

        if (!participacao) {

            return res.status(404).send(
                'Participação não encontrada.'
            );

        }


        const voluntarios =
            await Voluntario.listarTodos();

        const campanhas =
            await Campanha.listarTodas();


        res.render(
            'participacoes/editar',
            {
                titulo:
                    'Editar Participação | Instituto Solidarize',

                participacao,
                voluntarios,
                campanhas
            }
        );


    } catch (erro) {

        console.error(erro);

        res.status(500).send(
            'Erro ao carregar participação.'
        );

    }

};


// ATUALIZAR
exports.atualizar = async (req, res) => {

    try {

        const {
            voluntario_id,
            campanha_id,
            status
        } = req.body;


        await Participacao.atualizar(
            req.params.id,
            voluntario_id,
            campanha_id,
            status
        );


        res.redirect(
            '/admin/participacoes'
        );


    } catch (erro) {

        console.error(erro);

        res.status(500).send(
            'Erro ao atualizar participação.'
        );

    }

};


// EXCLUIR
exports.excluir = async (req, res) => {

    try {

        await Participacao.excluir(
            req.params.id
        );

        res.redirect(
            '/admin/participacoes'
        );


    } catch (erro) {

        console.error(erro);

        res.status(500).send(
            'Erro ao excluir participação.'
        );

    }

};