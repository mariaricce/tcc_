const Doacao = require('../models/Doacao');

const Campanha = require('../models/Campanha');


// ========================================
// DOAÇÃO PÚBLICA
// ========================================


// ========================================
// ABRIR PÁGINA DE DOAÇÃO
// ========================================

exports.exibirDoacaoPublica = async (req, res) => {

    try {

        const campanha =
            await Campanha.buscarPorId(
                req.params.campanhaId
            );


        if (!campanha) {

            return res.status(404).send(
                'Campanha não encontrada.'
            );

        }


        if (campanha.status !== 'Ativa') {

            return res.status(400).send(
                'Esta campanha não está disponível para doações.'
            );

        }


        return res.render(
            'doacoes/doar',
            {

                titulo:
                    `Doar para ${campanha.titulo} | Instituto Solidarize`,

                campanha,

                erro: null,

                dados: {}

            }
        );


    } catch (erro) {

        console.error(
            'Erro ao abrir página de doação:',
            erro
        );


        return res.status(500).send(
            'Erro ao carregar a página de doação.'
        );

    }

};


// ========================================
// REGISTRAR DOAÇÃO PÚBLICA
// ========================================

exports.criarDoacaoPublica = async (req, res) => {

    try {

        const campanha =
            await Campanha.buscarPorId(
                req.params.campanhaId
            );


        if (!campanha) {

            return res.status(404).send(
                'Campanha não encontrada.'
            );

        }


        if (campanha.status !== 'Ativa') {

            return res.status(400).send(
                'Esta campanha não está disponível para doações.'
            );

        }


        let {
            doador_nome,
            valor
        } = req.body;


        // ========================================
        // CAMPOS OBRIGATÓRIOS
        // ========================================

        if (!doador_nome || !valor) {

            return res.render(
                'doacoes/doar',
                {

                    titulo:
                        `Doar para ${campanha.titulo} | Instituto Solidarize`,

                    campanha,

                    erro:
                        'Informe seu nome e o valor da doação.',

                    dados: req.body

                }
            );

        }


        doador_nome =
            doador_nome.trim();


        const valorNumerico =
            Number(valor);


        // ========================================
        // VALIDAR NOME
        // ========================================

        if (doador_nome.length < 3) {

            return res.render(
                'doacoes/doar',
                {

                    titulo:
                        `Doar para ${campanha.titulo} | Instituto Solidarize`,

                    campanha,

                    erro:
                        'Informe um nome válido.',

                    dados: req.body

                }
            );

        }


        // ========================================
        // VALIDAR VALOR
        // ========================================

        if (
            !Number.isFinite(valorNumerico) ||
            valorNumerico <= 0
        ) {

            return res.render(
                'doacoes/doar',
                {

                    titulo:
                        `Doar para ${campanha.titulo} | Instituto Solidarize`,

                    campanha,

                    erro:
                        'Informe um valor de doação válido.',

                    dados: req.body

                }
            );

        }


        // Evita valores absurdamente altos

        if (valorNumerico > 1000000) {

            return res.render(
                'doacoes/doar',
                {

                    titulo:
                        `Doar para ${campanha.titulo} | Instituto Solidarize`,

                    campanha,

                    erro:
                        'O valor informado é inválido.',

                    dados: req.body

                }
            );

        }


        // ========================================
        // DATA LOCAL
        // ========================================

        const agora =
            new Date();


        const ano =
            agora.getFullYear();


        const mes =
            String(
                agora.getMonth() + 1
            ).padStart(2, '0');


        const dia =
            String(
                agora.getDate()
            ).padStart(2, '0');


        const dataDoacao =
            `${ano}-${mes}-${dia}`;


        // ========================================
        // CADASTRAR DOAÇÃO
        // ========================================

        const resultado =
            await Doacao.criar(

                doador_nome,

                'Dinheiro',

                'Doação em dinheiro realizada pelo site.',

                null,

                valorNumerico.toFixed(2),

                dataDoacao,

                campanha.id,

                'Pendente'

            );


        // ========================================
        // PROTEGER A PÁGINA DO PIX
        // ========================================

        /*
            Guarda na sessão o ID da doação
            criada neste navegador.

            Assim, a página de PIX só poderá
            exibir esta doação.
        */

        req.session.doacaoPublicaId =
            Number(resultado.insertId);


        // ========================================
        // REDIRECIONAR PARA PIX
        // ========================================

        return res.redirect(
            `/doar/sucesso/${resultado.insertId}`
        );


    } catch (erro) {

        console.error(
            'Erro ao registrar doação pelo site:',
            erro
        );


        return res.status(500).send(
            'Não foi possível registrar a doação.'
        );

    }

};


// ========================================
// EXIBIR PAGAMENTO PIX
// ========================================

exports.exibirSucessoDoacao = async (req, res) => {

    try {

        // ========================================
        // VALIDAR ID DA URL
        // ========================================

        const doacaoId =
            Number(req.params.id);


        if (
            !Number.isInteger(doacaoId) ||
            doacaoId <= 0
        ) {

            return res.status(404).send(
                'Doação não encontrada.'
            );

        }


        // ========================================
        // VALIDAR SESSÃO
        // ========================================

        const doacaoSessaoId =
            Number(
                req.session.doacaoPublicaId
            );


        /*
            A página só pode ser acessada
            quando o ID da URL for exatamente
            o mesmo ID salvo na sessão após
            a criação da doação.
        */

        if (
            !doacaoSessaoId ||
            doacaoSessaoId !== doacaoId
        ) {

            return res.status(403).send(
                'Esta página de doação não está disponível nesta sessão.'
            );

        }


        // ========================================
        // BUSCAR DOAÇÃO
        // ========================================

        const doacao =
            await Doacao.buscarPublicaPorId(
                doacaoId
            );


        if (!doacao) {

            return res.status(404).send(
                'Doação não encontrada.'
            );

        }


        // ========================================
        // CONFIGURAÇÕES DO PIX
        // ========================================

        const pixChave =
            process.env.PIX_CHAVE || '';


        const pixRecebedor =
            process.env.PIX_RECEBEDOR ||
            'Instituto Solidarize';


        // ========================================
        // WHATSAPP
        // ========================================

        const whatsappNumero =
            process.env.WHATSAPP_NUMERO ||
            '5545999476198';


        const mensagemWhatsApp =
            encodeURIComponent(
                `Olá! Realizei uma doação para o Instituto Solidarize.

Doação: #${doacao.id}
Campanha: ${doacao.campanha || 'Não informada'}
Doador: ${doacao.doador_nome}
Valor: R$ ${Number(doacao.valor)
                    .toFixed(2)
                    .replace('.', ',')}

Gostaria de enviar o comprovante do PIX.`
            );


        const whatsappLink =
            `https://wa.me/${whatsappNumero}?text=${mensagemWhatsApp}`;


        // ========================================
        // EXIBIR PÁGINA
        // ========================================

        return res.render(
            'doacoes/doacao-sucesso',
            {

                titulo:
                    'Pagamento da Doação | Instituto Solidarize',

                doacao,

                pixChave,

                pixRecebedor,

                whatsappLink

            }
        );


    } catch (erro) {

        console.error(
            'Erro ao exibir pagamento:',
            erro
        );


        return res.status(500).send(
            'Erro ao carregar os dados da doação.'
        );

    }

};


// ========================================
// ADMINISTRADOR
// ========================================


// ========================================
// LISTAR DOAÇÕES
// ========================================

exports.listar = async (req, res) => {

    try {

        const doacoes =
            await Doacao.listarTodas();


        return res.render(
            'doacoes/index',
            {

                titulo:
                    'Gerenciar Doações | Instituto Solidarize',

                doacoes

            }
        );


    } catch (erro) {

        console.error(
            'Erro ao listar doações:',
            erro
        );


        return res.status(500).send(
            'Erro ao listar doações.'
        );

    }

};


// ========================================
// EXIBIR NOVA DOAÇÃO
// ========================================

exports.exibirNova = async (req, res) => {

    try {

        const campanhas =
            await Campanha.listarTodas();


        return res.render(
            'doacoes/nova',
            {

                titulo:
                    'Nova Doação | Instituto Solidarize',

                campanhas,

                erro: null

            }
        );


    } catch (erro) {

        console.error(
            'Erro ao abrir formulário de doação:',
            erro
        );


        return res.status(500).send(
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

            const campanhas =
                await Campanha.listarTodas();


            return res.render(
                'doacoes/nova',
                {

                    titulo:
                        'Nova Doação | Instituto Solidarize',

                    campanhas,

                    erro:
                        'Preencha os campos obrigatórios.'

                }
            );

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


        return res.redirect(
            '/admin/doacoes'
        );


    } catch (erro) {

        console.error(
            'Erro ao cadastrar doação:',
            erro
        );


        return res.status(500).send(
            'Erro ao cadastrar doação.'
        );

    }

};


// ========================================
// EXIBIR EDIÇÃO
// ========================================

exports.exibirEditar = async (req, res) => {

    try {

        const doacao =
            await Doacao.buscarPorId(
                req.params.id
            );


        if (!doacao) {

            return res.status(404).send(
                'Doação não encontrada.'
            );

        }


        const campanhas =
            await Campanha.listarTodas();


        return res.render(
            'doacoes/editar',
            {

                titulo:
                    'Editar Doação | Instituto Solidarize',

                doacao,

                campanhas,

                erro: null

            }
        );


    } catch (erro) {

        console.error(
            'Erro ao carregar doação:',
            erro
        );


        return res.status(500).send(
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

            const doacao =
                await Doacao.buscarPorId(
                    req.params.id
                );


            const campanhas =
                await Campanha.listarTodas();


            return res.render(
                'doacoes/editar',
                {

                    titulo:
                        'Editar Doação | Instituto Solidarize',

                    doacao,

                    campanhas,

                    erro:
                        'Preencha os campos obrigatórios.'

                }
            );

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


        return res.redirect(
            '/admin/doacoes'
        );


    } catch (erro) {

        console.error(
            'Erro ao atualizar doação:',
            erro
        );


        return res.status(500).send(
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


        return res.redirect(
            '/admin/doacoes'
        );


    } catch (erro) {

        console.error(
            'Erro ao excluir doação:',
            erro
        );


        return res.status(500).send(
            'Erro ao excluir doação.'
        );

    }

};