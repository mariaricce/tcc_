const pool = require('../config/database');


const Campanha = {

    // ========================================
    // LISTAR TODAS AS CAMPANHAS
    // ADMIN
    // ========================================

    async listarTodas() {

        const [campanhas] = await pool.execute(`

            SELECT
                c.*,

                COALESCE(
                    (
                        SELECT SUM(d.valor)
                        FROM doacoes d
                        WHERE d.campanha_id = c.id
                        AND d.status = 'Recebida'
                    ),
                    0
                ) AS valor_arrecadado

            FROM campanhas c

            ORDER BY c.id DESC

        `);

        return campanhas;
    },


    // ========================================
    // LISTAR CAMPANHAS ATIVAS
    // SITE PÚBLICO
    // ========================================

    async listarAtivas() {

        const [campanhas] = await pool.execute(`

            SELECT
                c.*,

                COALESCE(
                    (
                        SELECT SUM(d.valor)
                        FROM doacoes d
                        WHERE d.campanha_id = c.id
                        AND d.status = 'Recebida'
                    ),
                    0
                ) AS valor_arrecadado

            FROM campanhas c

            WHERE c.status = 'Ativa'

            ORDER BY c.id DESC

        `);

        return campanhas;
    },


    // ========================================
    // BUSCAR CAMPANHA POR ID
    // ========================================

    async buscarPorId(id) {

        const [campanhas] = await pool.execute(`

            SELECT
                c.id,
                c.titulo,
                c.descricao,
                c.imagem,

                DATE_FORMAT(
                    c.data_inicio,
                    '%Y-%m-%d'
                ) AS data_inicio,

                DATE_FORMAT(
                    c.data_fim,
                    '%Y-%m-%d'
                ) AS data_fim,

                c.meta,
                c.status,

                COALESCE(
                    (
                        SELECT SUM(d.valor)
                        FROM doacoes d
                        WHERE d.campanha_id = c.id
                        AND d.status = 'Recebida'
                    ),
                    0
                ) AS valor_arrecadado

            FROM campanhas c

            WHERE c.id = ?

        `, [id]);

        return campanhas[0];
    },


    // ========================================
    // CONTAR REGISTROS VINCULADOS
    // ========================================

    async contarVinculos(id) {

        const [resultado] = await pool.execute(`

            SELECT

                (
                    SELECT COUNT(*)
                    FROM doacoes
                    WHERE campanha_id = ?
                ) AS doacoes,

                (
                    SELECT COUNT(*)
                    FROM participacoes
                    WHERE campanha_id = ?
                ) AS participacoes,

                (
                    SELECT COUNT(*)
                    FROM atendimentos
                    WHERE campanha_id = ?
                ) AS atendimentos

        `, [
            id,
            id,
            id
        ]);


        return {
            doacoes:
                Number(resultado[0].doacoes) || 0,

            participacoes:
                Number(resultado[0].participacoes) || 0,

            atendimentos:
                Number(resultado[0].atendimentos) || 0
        };

    },


    // ========================================
    // CRIAR CAMPANHA
    // ========================================

    async criar(
        titulo,
        descricao,
        imagem,
        dataInicio,
        dataFim,
        meta,
        status
    ) {

        const [resultado] = await pool.execute(`

            INSERT INTO campanhas
            (
                titulo,
                descricao,
                imagem,
                data_inicio,
                data_fim,
                meta,
                status
            )

            VALUES (?, ?, ?, ?, ?, ?, ?)

        `, [

            titulo,
            descricao,
            imagem || null,
            dataInicio,
            dataFim || null,
            meta || null,
            status

        ]);

        return resultado;
    },


    // ========================================
    // ATUALIZAR CAMPANHA
    // ========================================

    async atualizar(
        id,
        titulo,
        descricao,
        imagem,
        dataInicio,
        dataFim,
        meta,
        status
    ) {

        const [resultado] = await pool.execute(`

            UPDATE campanhas

            SET
                titulo = ?,
                descricao = ?,
                imagem = ?,
                data_inicio = ?,
                data_fim = ?,
                meta = ?,
                status = ?

            WHERE id = ?

        `, [

            titulo,
            descricao,
            imagem || null,
            dataInicio,
            dataFim || null,
            meta || null,
            status,
            id

        ]);

        return resultado;
    },


    // ========================================
    // EXCLUIR CAMPANHA
    // ========================================

    async excluir(id) {

        const [resultado] = await pool.execute(
            `
                DELETE FROM campanhas
                WHERE id = ?
            `,
            [id]
        );

        return resultado;
    }

};


module.exports = Campanha;