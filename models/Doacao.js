const pool = require('../config/database');


const Doacao = {

    // ========================================
    // LISTAR TODAS
    // ========================================

    async listarTodas() {

        const [doacoes] = await pool.execute(`

            SELECT
                d.id,
                d.doador_nome,
                d.tipo,
                d.descricao,
                d.quantidade,
                d.valor,

                DATE_FORMAT(
                    d.data_doacao,
                    '%d/%m/%Y'
                ) AS data_doacao_formatada,

                d.status,
                d.campanha_id,

                c.titulo AS campanha,
                c.imagem AS campanha_imagem

            FROM doacoes d

            LEFT JOIN campanhas c
                ON d.campanha_id = c.id

            ORDER BY d.id DESC

        `);

        return doacoes;
    },


    // ========================================
    // BUSCAR POR ID
    // ADMIN
    // ========================================

    async buscarPorId(id) {

        const [doacoes] = await pool.execute(`

            SELECT
                id,
                doador_nome,
                tipo,
                descricao,
                quantidade,
                valor,

                DATE_FORMAT(
                    data_doacao,
                    '%Y-%m-%d'
                ) AS data_doacao,

                campanha_id,
                status

            FROM doacoes

            WHERE id = ?

        `, [id]);

        return doacoes[0];
    },


    // ========================================
    // BUSCAR DOAÇÃO PÚBLICA
    // ========================================

    async buscarPublicaPorId(id) {

        const [doacoes] = await pool.execute(`

            SELECT
                d.id,
                d.doador_nome,
                d.tipo,
                d.valor,
                d.status,
                d.campanha_id,

                DATE_FORMAT(
                    d.data_doacao,
                    '%d/%m/%Y'
                ) AS data_doacao_formatada,

                c.titulo AS campanha,
                c.imagem AS campanha_imagem

            FROM doacoes d

            LEFT JOIN campanhas c
                ON d.campanha_id = c.id

            WHERE d.id = ?

        `, [id]);

        return doacoes[0];
    },


    // ========================================
    // CRIAR
    // ========================================

    async criar(
        doadorNome,
        tipo,
        descricao,
        quantidade,
        valor,
        dataDoacao,
        campanhaId,
        status
    ) {

        const [resultado] = await pool.execute(`

            INSERT INTO doacoes
            (
                doador_nome,
                tipo,
                descricao,
                quantidade,
                valor,
                data_doacao,
                campanha_id,
                status
            )

            VALUES (?, ?, ?, ?, ?, ?, ?, ?)

        `, [

            doadorNome,
            tipo,
            descricao || null,
            quantidade || null,
            valor || null,
            dataDoacao,
            campanhaId || null,
            status

        ]);

        return resultado;
    },


    // ========================================
    // ATUALIZAR
    // ========================================

    async atualizar(
        id,
        doadorNome,
        tipo,
        descricao,
        quantidade,
        valor,
        dataDoacao,
        campanhaId,
        status
    ) {

        const [resultado] = await pool.execute(`

            UPDATE doacoes

            SET
                doador_nome = ?,
                tipo = ?,
                descricao = ?,
                quantidade = ?,
                valor = ?,
                data_doacao = ?,
                campanha_id = ?,
                status = ?

            WHERE id = ?

        `, [

            doadorNome,
            tipo,
            descricao || null,
            quantidade || null,
            valor || null,
            dataDoacao,
            campanhaId || null,
            status,
            id

        ]);

        return resultado;
    },


    // ========================================
    // EXCLUIR
    // ========================================

    async excluir(id) {

        const [resultado] = await pool.execute(
            `
                DELETE FROM doacoes
                WHERE id = ?
            `,
            [id]
        );

        return resultado;
    }

};


module.exports = Doacao;