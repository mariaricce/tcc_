const pool = require('../config/database');


exports.dashboard = async (req, res) => {

    try {

        // Quantidade de campanhas ativas
        const [campanhas] = await pool.execute(
            `SELECT COUNT(*) AS total
             FROM campanhas
             WHERE status = 'Ativa'`
        );


        // Quantidade de voluntários
        const [voluntarios] = await pool.execute(
            `SELECT COUNT(*) AS total
             FROM voluntarios`
        );


        // Quantidade de beneficiários
        const [beneficiarios] = await pool.execute(
            `SELECT COUNT(*) AS total
             FROM beneficiarios`
        );


        // Quantidade de doações
        const [doacoes] = await pool.execute(
            `SELECT COUNT(*) AS total
             FROM doacoes`
        );


        // Últimas 5 doações
        const [ultimasDoacoes] = await pool.execute(
            `SELECT
                id,
                doador_nome,
                tipo,
                valor,
                data_doacao
             FROM doacoes
             ORDER BY id DESC
             LIMIT 5`
        );


        // Últimos 5 voluntários
        const [ultimosVoluntarios] = await pool.execute(
            `SELECT
                id,
                nome,
                email,
                status,
                data_cadastro
             FROM voluntarios
             ORDER BY id DESC
             LIMIT 5`
        );


        res.render('admin/dashboard', {

            titulo: 'Painel Administrativo | Instituto Solidarize',

            usuario: req.session.usuario,

            totais: {
                campanhas: campanhas[0].total,
                voluntarios: voluntarios[0].total,
                beneficiarios: beneficiarios[0].total,
                doacoes: doacoes[0].total
            },

            ultimasDoacoes,
            ultimosVoluntarios

        });


    } catch (erro) {

        console.error(
            'Erro ao carregar dashboard:',
            erro
        );


        res.status(500).send(
            'Erro ao carregar o painel administrativo.'
        );

    }

};