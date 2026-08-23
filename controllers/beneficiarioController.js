const Beneficiario =
    require('../models/Beneficiario');


// LISTAR
exports.listar = async (req, res) => {

    try {

        const beneficiarios =
            await Beneficiario.listarTodos();

        res.render('beneficiarios/index', {

            titulo:
                'Gerenciar Beneficiários | Instituto Solidarize',

            beneficiarios

        });

    } catch (erro) {

        console.error(
            'Erro ao listar beneficiários:',
            erro
        );

        res.status(500).send(
            'Erro ao listar beneficiários.'
        );

    }

};


// EXIBIR FORMULÁRIO
exports.exibirNovo = (req, res) => {

    res.render('beneficiarios/novo', {

        titulo:
            'Novo Beneficiário | Instituto Solidarize',

        erro: null

    });

};


// CADASTRAR
exports.criar = async (req, res) => {

    try {

        const {
            nome,
            telefone,
            endereco,
            observacoes,
            status
        } = req.body;


        if (!nome || !status) {

            return res.render(
                'beneficiarios/novo',
                {

                    titulo:
                        'Novo Beneficiário | Instituto Solidarize',

                    erro:
                        'Nome e status são obrigatórios.'

                }
            );

        }


        await Beneficiario.criar(
            nome,
            telefone,
            endereco,
            observacoes,
            status
        );


        res.redirect(
            '/admin/beneficiarios'
        );


    } catch (erro) {

        console.error(
            'Erro ao cadastrar beneficiário:',
            erro
        );


        res.status(500).send(
            'Erro ao cadastrar beneficiário.'
        );

    }

};


// EXIBIR EDIÇÃO
exports.exibirEditar = async (req, res) => {

    try {

        const beneficiario =
            await Beneficiario.buscarPorId(
                req.params.id
            );


        if (!beneficiario) {

            return res.status(404).send(
                'Beneficiário não encontrado.'
            );

        }


        res.render(
            'beneficiarios/editar',
            {

                titulo:
                    'Editar Beneficiário | Instituto Solidarize',

                beneficiario,

                erro: null

            }
        );


    } catch (erro) {

        console.error(
            'Erro ao carregar beneficiário:',
            erro
        );


        res.status(500).send(
            'Erro ao carregar beneficiário.'
        );

    }

};


// ATUALIZAR
exports.atualizar = async (req, res) => {

    try {

        const {
            nome,
            telefone,
            endereco,
            observacoes,
            status
        } = req.body;


        if (!nome || !status) {

            const beneficiario =
                await Beneficiario.buscarPorId(
                    req.params.id
                );


            return res.render(
                'beneficiarios/editar',
                {

                    titulo:
                        'Editar Beneficiário | Instituto Solidarize',

                    beneficiario,

                    erro:
                        'Nome e status são obrigatórios.'

                }
            );

        }


        await Beneficiario.atualizar(
            req.params.id,
            nome,
            telefone,
            endereco,
            observacoes,
            status
        );


        res.redirect(
            '/admin/beneficiarios'
        );


    } catch (erro) {

        console.error(
            'Erro ao atualizar beneficiário:',
            erro
        );


        res.status(500).send(
            'Erro ao atualizar beneficiário.'
        );

    }

};


// EXCLUIR
exports.excluir = async (req, res) => {

    try {

        await Beneficiario.excluir(
            req.params.id
        );


        res.redirect(
            '/admin/beneficiarios'
        );


    } catch (erro) {

        console.error(
            'Erro ao excluir beneficiário:',
            erro
        );


        res.status(500).send(
            'Erro ao excluir beneficiário.'
        );

    }

};