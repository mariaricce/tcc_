const Voluntario =
    require('../models/Voluntario');


// =====================================
// FORMULÁRIO PÚBLICO
// =====================================

exports.exibirFormularioPublico = (
    req,
    res
) => {

    res.render(
        'voluntarios/quero-ser-voluntario',
        {

            titulo:
                'Seja Voluntário | Instituto Solidarize',

            erro: null,

            sucesso:
                req.query.sucesso === '1'

        }
    );

};


// =====================================
// CADASTRO PÚBLICO
// =====================================

exports.cadastrarPublico = async (
    req,
    res
) => {

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
            await Voluntario.buscarPorEmail(
                email
            );


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


        return res.redirect(
            '/quero-ser-voluntario?sucesso=1'
        );


    } catch (erro) {

        console.error(
            'Erro ao cadastrar voluntário:',
            erro
        );


        return res.render(
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

exports.listar = async (
    req,
    res
) => {

    try {

        const voluntarios =
            await Voluntario.listarTodos();


        let erroExclusao = null;


        if (
            req.query.erro ===
            'participacoes'
        ) {

            erroExclusao =
                'Este voluntário não pode ser excluído porque possui participações registradas. Remova ou altere os registros vinculados antes de excluir o voluntário.';

        }


        return res.render(
            'voluntarios/index',
            {

                titulo:
                    'Gerenciar Voluntários | Instituto Solidarize',

                voluntarios,

                erroExclusao

            }
        );


    } catch (erro) {

        console.error(
            'Erro ao listar voluntários:',
            erro
        );


        return res.status(500).send(
            'Erro ao listar voluntários.'
        );

    }

};


// =====================================
// ADMIN - NOVO
// =====================================

exports.exibirNovo = (
    req,
    res
) => {

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

exports.criar = async (
    req,
    res
) => {

    try {

        const {
            nome,
            email,
            telefone,
            area_interesse,
            disponibilidade,
            status
        } = req.body;


        if (
            !nome ||
            !email ||
            !status
        ) {

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
            await Voluntario.buscarPorEmail(
                email
            );


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


        return res.redirect(
            '/admin/voluntarios'
        );


    } catch (erro) {

        console.error(
            'Erro ao criar voluntário:',
            erro
        );


        return res.status(500).send(
            'Erro ao cadastrar voluntário.'
        );

    }

};


// =====================================
// ADMIN - EDITAR
// =====================================

exports.exibirEditar = async (
    req,
    res
) => {

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


        return res.render(
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


        return res.status(500).send(
            'Erro ao carregar voluntário.'
        );

    }

};


// =====================================
// ADMIN - ATUALIZAR
// =====================================

exports.atualizar = async (
    req,
    res
) => {

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


        return res.redirect(
            '/admin/voluntarios'
        );


    } catch (erro) {

        console.error(
            'Erro ao atualizar voluntário:',
            erro
        );


        return res.status(500).send(
            'Erro ao atualizar voluntário.'
        );

    }

};


// =====================================
// ADMIN - EXCLUIR
// =====================================

exports.excluir = async (
    req,
    res
) => {

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


        // =====================================
        // VERIFICAR PARTICIPAÇÕES
        // =====================================

        const totalParticipacoes =
            await Voluntario
                .contarParticipacoes(
                    req.params.id
                );


        if (totalParticipacoes > 0) {

            return res.redirect(
                '/admin/voluntarios?erro=participacoes'
            );

        }


        // =====================================
        // EXCLUIR
        // =====================================

        await Voluntario.excluir(
            req.params.id
        );


        return res.redirect(
            '/admin/voluntarios'
        );


    } catch (erro) {

        console.error(
            'Erro ao excluir voluntário:',
            erro
        );


        /*
            Proteção adicional.

            Se o banco bloquear a exclusão
            por alguma chave estrangeira,
            o usuário volta para a listagem
            em vez de receber erro 500.
        */

        if (
            erro.code ===
            'ER_ROW_IS_REFERENCED_2'
        ) {

            return res.redirect(
                '/admin/voluntarios?erro=participacoes'
            );

        }


        return res.status(500).send(
            'Erro ao excluir voluntário.'
        );

    }

};