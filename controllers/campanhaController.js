const fs = require('fs');
const path = require('path');

const Campanha =
    require('../models/Campanha');


// ========================================
// REMOVER IMAGEM DO SERVIDOR
// ========================================

function removerImagemCampanha(nomeImagem) {

    if (!nomeImagem) {
        return;
    }


    try {

        const caminhoImagem =
            path.join(
                __dirname,
                '../public/images/campanhas',
                nomeImagem
            );


        if (fs.existsSync(caminhoImagem)) {

            fs.unlinkSync(caminhoImagem);

        }

    } catch (erro) {

        console.error(
            'Erro ao remover imagem da campanha:',
            erro
        );

    }

}


// ========================================
// PÁGINA PÚBLICA
// ========================================

exports.publicas = async (req, res) => {

    try {

        const campanhas =
            await Campanha.listarAtivas();


        return res.render(
            'campanhas',
            {

                titulo:
                    'Campanhas | Instituto Solidarize',

                campanhas

            }
        );


    } catch (erro) {

        console.error(
            'Erro ao carregar campanhas:',
            erro
        );


        return res.status(500).send(
            'Erro ao carregar campanhas.'
        );

    }

};


// ========================================
// LISTAR NO ADMIN
// ========================================

exports.listar = async (req, res) => {

    try {

        const campanhas =
            await Campanha.listarTodas();


        return res.render(
            'campanhas/index',
            {

                titulo:
                    'Gerenciar Campanhas | Instituto Solidarize',

                campanhas,

                erroExclusao:
                    req.query.erro === 'vinculos',

                sucessoExclusao:
                    req.query.excluida === '1'

            }
        );


    } catch (erro) {

        console.error(
            'Erro ao listar campanhas:',
            erro
        );


        return res.status(500).send(
            'Erro ao listar campanhas.'
        );

    }

};


// ========================================
// FORMULÁRIO NOVA CAMPANHA
// ========================================

exports.exibirNova = (req, res) => {

    return res.render(
        'campanhas/nova',
        {

            titulo:
                'Nova Campanha | Instituto Solidarize',

            erro: null

        }
    );

};


// ========================================
// CADASTRAR CAMPANHA
// ========================================

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


        const imagem =
            req.file
                ? req.file.filename
                : null;


        if (
            !titulo ||
            !descricao ||
            !data_inicio ||
            !status
        ) {

            if (imagem) {

                removerImagemCampanha(
                    imagem
                );

            }


            return res.render(
                'campanhas/nova',
                {

                    titulo:
                        'Nova Campanha | Instituto Solidarize',

                    erro:
                        'Preencha os campos obrigatórios.'

                }
            );

        }


        await Campanha.criar(

            titulo.trim(),

            descricao.trim(),

            imagem,

            data_inicio,

            data_fim,

            meta,

            status

        );


        return res.redirect(
            '/admin/campanhas'
        );


    } catch (erro) {

        console.error(
            'Erro ao cadastrar campanha:',
            erro
        );


        if (
            req.file &&
            req.file.filename
        ) {

            removerImagemCampanha(
                req.file.filename
            );

        }


        return res.render(
            'campanhas/nova',
            {

                titulo:
                    'Nova Campanha | Instituto Solidarize',

                erro:
                    'Não foi possível cadastrar a campanha.'

            }
        );

    }

};


// ========================================
// FORMULÁRIO EDITAR CAMPANHA
// ========================================

exports.exibirEditar = async (req, res) => {

    try {

        const campanha =
            await Campanha.buscarPorId(
                req.params.id
            );


        if (!campanha) {

            return res
                .status(404)
                .send(
                    'Campanha não encontrada.'
                );

        }


        return res.render(
            'campanhas/editar',
            {

                titulo:
                    'Editar Campanha | Instituto Solidarize',

                campanha,

                erro: null

            }
        );


    } catch (erro) {

        console.error(
            'Erro ao carregar campanha:',
            erro
        );


        return res.status(500).send(
            'Erro ao carregar campanha.'
        );

    }

};


// ========================================
// ATUALIZAR CAMPANHA
// ========================================

exports.atualizar = async (req, res) => {

    let campanhaAtual = null;


    try {

        const {
            titulo,
            descricao,
            data_inicio,
            data_fim,
            meta,
            status
        } = req.body;


        campanhaAtual =
            await Campanha.buscarPorId(
                req.params.id
            );


        if (!campanhaAtual) {

            if (
                req.file &&
                req.file.filename
            ) {

                removerImagemCampanha(
                    req.file.filename
                );

            }


            return res
                .status(404)
                .send(
                    'Campanha não encontrada.'
                );

        }


        const imagem =
            req.file
                ? req.file.filename
                : campanhaAtual.imagem;


        if (
            !titulo ||
            !descricao ||
            !data_inicio ||
            !status
        ) {

            if (
                req.file &&
                req.file.filename
            ) {

                removerImagemCampanha(
                    req.file.filename
                );

            }


            return res.render(
                'campanhas/editar',
                {

                    titulo:
                        'Editar Campanha | Instituto Solidarize',

                    campanha:
                        campanhaAtual,

                    erro:
                        'Preencha os campos obrigatórios.'

                }
            );

        }


        await Campanha.atualizar(

            req.params.id,

            titulo.trim(),

            descricao.trim(),

            imagem,

            data_inicio,

            data_fim,

            meta,

            status

        );


        // Remove a imagem antiga somente
        // depois de atualizar o banco com sucesso.

        if (
            req.file &&
            req.file.filename &&
            campanhaAtual.imagem &&
            campanhaAtual.imagem !==
                req.file.filename
        ) {

            removerImagemCampanha(
                campanhaAtual.imagem
            );

        }


        return res.redirect(
            '/admin/campanhas'
        );


    } catch (erro) {

        console.error(
            'Erro ao atualizar campanha:',
            erro
        );


        if (
            req.file &&
            req.file.filename
        ) {

            removerImagemCampanha(
                req.file.filename
            );

        }


        return res.status(500).send(
            'Erro ao atualizar campanha.'
        );

    }

};


// ========================================
// EXCLUIR CAMPANHA
// ========================================

exports.excluir = async (req, res) => {

    try {

        const campanha =
            await Campanha.buscarPorId(
                req.params.id
            );


        if (!campanha) {

            return res
                .status(404)
                .send(
                    'Campanha não encontrada.'
                );

        }


        // ========================================
        // VERIFICAR HISTÓRICO DA CAMPANHA
        // ========================================

        const vinculos =
            await Campanha.contarVinculos(
                req.params.id
            );


        const possuiHistorico =
            vinculos.doacoes > 0 ||
            vinculos.participacoes > 0 ||
            vinculos.atendimentos > 0;


        if (possuiHistorico) {

            console.log(
                `Campanha ${campanha.id} não excluída. ` +
                `Doações: ${vinculos.doacoes}, ` +
                `Participações: ${vinculos.participacoes}, ` +
                `Atendimentos: ${vinculos.atendimentos}`
            );


            return res.redirect(
                '/admin/campanhas?erro=vinculos'
            );

        }


        // ========================================
        // EXCLUIR DO BANCO
        // ========================================

        await Campanha.excluir(
            req.params.id
        );


        // ========================================
        // REMOVER IMAGEM
        // ========================================

        if (campanha.imagem) {

            removerImagemCampanha(
                campanha.imagem
            );

        }


        return res.redirect(
            '/admin/campanhas?excluida=1'
        );


    } catch (erro) {

        console.error(
            'Erro ao excluir campanha:',
            erro
        );


        return res.status(500).send(
            'Erro ao excluir campanha.'
        );

    }

};