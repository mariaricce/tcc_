const Beneficiario =
    require('../models/Beneficiario');


// =====================================
// ADMIN - LISTAR
// =====================================

exports.listar = async (req, res) => {

    try {

        const beneficiarios =
            await Beneficiario.listarTodos();


        let erroExclusao = null;


        if (
            req.query.erro ===
            'atendimentos'
        ) {

            erroExclusao =
                'Este beneficiário não pode ser excluído porque possui atendimentos registrados. Remova ou altere os registros vinculados antes de excluir o beneficiário.';

        }


        return res.render(
            'beneficiarios/index',
            {

                titulo:
                    'Gerenciar Beneficiários | Instituto Solidarize',

                beneficiarios,

                erroExclusao

            }
        );


    } catch (erro) {

        console.error(
            'Erro ao listar beneficiários:',
            erro
        );


        return res.status(500).send(
            'Erro ao listar beneficiários.'
        );

    }

};


// =====================================
// ADMIN - NOVO
// =====================================

exports.exibirNovo = (req, res) => {

    return res.render(
        'beneficiarios/novo',
        {

            titulo:
                'Novo Beneficiário | Instituto Solidarize',

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


        return res.redirect(
            '/admin/beneficiarios'
        );


    } catch (erro) {

        console.error(
            'Erro ao cadastrar beneficiário:',
            erro
        );


        return res.status(500).send(
            'Erro ao cadastrar beneficiário.'
        );

    }

};


// =====================================
// ADMIN - EXIBIR EDIÇÃO
// =====================================

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


        return res.render(
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


        return res.status(500).send(
            'Erro ao carregar beneficiário.'
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


        return res.redirect(
            '/admin/beneficiarios'
        );


    } catch (erro) {

        console.error(
            'Erro ao atualizar beneficiário:',
            erro
        );


        return res.status(500).send(
            'Erro ao atualizar beneficiário.'
        );

    }

};


// =====================================
// ADMIN - EXCLUIR
// =====================================

exports.excluir = async (req, res) => {

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


        // =====================================
        // VERIFICAR ATENDIMENTOS
        // =====================================

        const totalAtendimentos =
            await Beneficiario
                .contarAtendimentos(
                    req.params.id
                );


        if (totalAtendimentos > 0) {

            return res.redirect(
                '/admin/beneficiarios?erro=atendimentos'
            );

        }


        // =====================================
        // EXCLUIR
        // =====================================

        await Beneficiario.excluir(
            req.params.id
        );


        return res.redirect(
            '/admin/beneficiarios'
        );


    } catch (erro) {

        console.error(
            'Erro ao excluir beneficiário:',
            erro
        );


        /*
            Proteção adicional caso o banco
            bloqueie a exclusão por uma
            chave estrangeira.
        */

        if (
            erro.code ===
            'ER_ROW_IS_REFERENCED_2'
        ) {

            return res.redirect(
                '/admin/beneficiarios?erro=atendimentos'
            );

        }


        return res.status(500).send(
            'Erro ao excluir beneficiário.'
        );

    }

};