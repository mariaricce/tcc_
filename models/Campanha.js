const pool = require('../config/database');

const Campanha = {

    async listarTodas() {

        const [campanhas] = await pool.execute(`
            SELECT *
            FROM campanhas
            ORDER BY id DESC
        `);

        return campanhas;
    },


    async listarAtivas() {

        const [campanhas] = await pool.execute(`
            SELECT *
            FROM campanhas
            WHERE status = 'Ativa'
            ORDER BY id DESC
        `);

        return campanhas;
    },


    async buscarPorId(id) {

        const [campanhas] = await pool.execute(`
            SELECT
                id,
                titulo,
                descricao,
                DATE_FORMAT(data_inicio, '%Y-%m-%d') AS data_inicio,
                DATE_FORMAT(data_fim, '%Y-%m-%d') AS data_fim,
                meta,
                status
            FROM campanhas
            WHERE id = ?
        `, [id]);

        return campanhas[0];
    },


    async criar(titulo, descricao, dataInicio, dataFim, meta, status) {

        const [resultado] = await pool.execute(`
            INSERT INTO campanhas
            (
                titulo,
                descricao,
                data_inicio,
                data_fim,
                meta,
                status
            )
            VALUES (?, ?, ?, ?, ?, ?)
        `, [
            titulo,
            descricao,
            dataInicio,
            dataFim || null,
            meta || null,
            status
        ]);

        return resultado;
    },


    async atualizar(
        id,
        titulo,
        descricao,
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
                data_inicio = ?,
                data_fim = ?,
                meta = ?,
                status = ?
            WHERE id = ?
        `, [
            titulo,
            descricao,
            dataInicio,
            dataFim || null,
            meta || null,
            status,
            id
        ]);

        return resultado;
    },


    async excluir(id) {

        const [resultado] = await pool.execute(
            `DELETE FROM campanhas WHERE id = ?`,
            [id]
        );

        return resultado;
    }

};


module.exports = Campanha;