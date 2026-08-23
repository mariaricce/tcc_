const Voluntario =
    require('../models/Voluntario');


// =====================================
// FORMULÁRIO PÚBLICO
// =====================================

exports.exibirFormularioPublico = (req, res) => {

    res.render('voluntarios/quero-ser-voluntario', {

        titulo: 'Seja Voluntário | Instituto Solidarize',

        erro: null,

        sucesso: req.query.sucesso === '1'

    });

};


// =====================================
// CADASTRO PÚBLICO
// =====================================

exports.cadastrarPublico = async (req, res) => {

    try {

        const {
            nome,
            email,
            telefone,
            area_interesse,
            disponibilidade
        } = req.body;


        if (!nome || !email) {

            return res.render(
                'voluntarios/quero-ser-voluntario',
                {

                    titulo:
                        'Seja Voluntário | Instituto Solidarize',

                    erro:
                        'Nome e e-mail são obrigatórios.',

                    sucesso: false

                }
            );

        }


        const existente =
            await Voluntario.buscarPorEmail(email);


        if (existente) {

            return res.render(
                'voluntarios/quero-ser-voluntario',
                {

                    titulo:
                        'Seja Voluntário | Instituto Solidarize',

                    erro:
                        'Este e-mail já está cadastrado como voluntário.',

                    sucesso: false

                }
            );

        }


        await Voluntario.criar(
            nome,
            email,
            telefone,
            area_interesse,
            disponibilidade,
            'Ativo'
        );


        res.redirect(
            '/quero-ser-voluntario?sucesso=1'
        );


    } catch (erro) {

        console.error(
            'Erro ao cadastrar voluntário:',
            erro
        );


        res.render(
            'voluntarios/quero-ser-voluntario',
            {

                titulo:
                    'Seja Voluntário | Instituto Solidarize',

                erro:
                    'Não foi possível realizar o cadastro.',

                sucesso: false

            }
        );

    }

};


// =====================================
// ADMIN - LISTAR
// =====================================

exports.listar = async (req, res) => {

    try {

        const voluntarios =
            await Voluntario.listarTodos();


        res.render(
            'voluntarios/index',
            {

                titulo:
                    'Gerenciar Voluntários | Instituto Solidarize',

                voluntarios

            }
        );


    } catch (erro) {

        console.error(
            'Erro ao listar voluntários:',
            erro
        );


        res.status(500).send(
            'Erro ao listar voluntários.'
        );

    }

};


// =====================================
// ADMIN - NOVO
// =====================================

exports.exibirNovo = (req, res) => {

    res.render(
        'voluntarios/novo',
        {

            titulo:
                'Novo Voluntário | Instituto Solidarize',

            erro: null

        }
    );

};


// =====================================
// ADMIN - CADASTRAR
// =====================================

exports.criar = async (req, res) => {

    try {

        const {
            nome,
            email,
            telefone,
            area_interesse,
            disponibilidade,
            status
        } = req.body;


        if (!nome || !email || !status) {

            return res.render(
                'voluntarios/novo',
                {

                    titulo:
                        'Novo Voluntário | Instituto Solidarize',

                    erro:
                        'Preencha os campos obrigatórios.'

                }
            );

        }


        const existente =
            await Voluntario.buscarPorEmail(email);


        if (existente) {

            return res.render(
                'voluntarios/novo',
                {

                    titulo:
                        'Novo Voluntário | Instituto Solidarize',

                    erro:
                        'Este e-mail já está cadastrado.'

                }
            );

        }


        await Voluntario.criar(
            nome,
            email,
            telefone,
            area_interesse,
            disponibilidade,
            status
        );


        res.redirect(
            '/admin/voluntarios'
        );


    } catch (erro) {

        console.error(
            'Erro ao criar voluntário:',
            erro
        );


        res.status(500).send(
            'Erro ao cadastrar voluntário.'
        );

    }

};


// =====================================
// ADMIN - EDITAR
// =====================================

exports.exibirEditar = async (req, res) => {

    try {

        const voluntario =
            await Voluntario.buscarPorId(
                req.params.id
            );


        if (!voluntario) {

            return res.status(404).send(
                'Voluntário não encontrado.'
            );

        }


        res.render(
            'voluntarios/editar',
            {

                titulo:
                    'Editar Voluntário | Instituto Solidarize',

                voluntario,

                erro: null

            }
        );


    } catch (erro) {

        console.error(
            'Erro ao carregar voluntário:',
            erro
        );


        res.status(500).send(
            'Erro ao carregar voluntário.'
        );

    }

};


// =====================================
// ADMIN - ATUALIZAR
// =====================================

exports.atualizar = async (req, res) => {

    try {

        const {
            nome,
            email,
            telefone,
            area_interesse,
            disponibilidade,
            status
        } = req.body;


        await Voluntario.atualizar(
            req.params.id,
            nome,
            email,
            telefone,
            area_interesse,
            disponibilidade,
            status
        );


        res.redirect(
            '/admin/voluntarios'
        );


    } catch (erro) {

        console.error(
            'Erro ao atualizar voluntário:',
            erro
        );


        res.status(500).send(
            'Erro ao atualizar voluntário.'
        );

    }

};


// =====================================
// ADMIN - EXCLUIR
// =====================================

exports.excluir = async (req, res) => {

    try {

        await Voluntario.excluir(
            req.params.id
        );


        res.redirect(
            '/admin/voluntarios'
        );


    } catch (erro) {

        console.error(
            'Erro ao excluir voluntário:',
            erro
        );


        res.status(500).send(
            'Erro ao excluir voluntário.'
        );

    }

};