const pool = require('../config/database');

const Atendimento = {

    async listarTodos() {

        const [atendimentos] = await pool.execute(`
            SELECT
                a.id,
                a.beneficiario_id,
                a.campanha_id,
                a.tipo_atendimento,
                a.descricao,
                DATE_FORMAT(a.data_atendimento, '%d/%m/%Y') AS data_formatada,
                a.status,
                b.nome AS beneficiario,
                c.titulo AS campanha
            FROM atendimentos a

            INNER JOIN beneficiarios b
                ON a.beneficiario_id = b.id

            LEFT JOIN campanhas c
                ON a.campanha_id = c.id

            ORDER BY a.id DESC
        `);

        return atendimentos;
    },


    async buscarPorId(id) {

        const [atendimentos] = await pool.execute(`
            SELECT
                id,
                beneficiario_id,
                campanha_id,
                tipo_atendimento,
                descricao,
                DATE_FORMAT(data_atendimento, '%Y-%m-%d') AS data_atendimento,
                status
            FROM atendimentos
            WHERE id = ?
        `, [id]);

        return atendimentos[0];
    },


    async criar(
        beneficiarioId,
        campanhaId,
        tipoAtendimento,
        descricao,
        dataAtendimento,
        status
    ) {

        const [resultado] = await pool.execute(`
            INSERT INTO atendimentos
            (
                beneficiario_id,
                campanha_id,
                tipo_atendimento,
                descricao,
                data_atendimento,
                status
            )
            VALUES (?, ?, ?, ?, ?, ?)
        `, [
            beneficiarioId,
            campanhaId || null,
            tipoAtendimento,
            descricao || null,
            dataAtendimento,
            status
        ]);

        return resultado;
    },


    async atualizar(
        id,
        beneficiarioId,
        campanhaId,
        tipoAtendimento,
        descricao,
        dataAtendimento,
        status
    ) {

        const [resultado] = await pool.execute(`
            UPDATE atendimentos
            SET
                beneficiario_id = ?,
                campanha_id = ?,
                tipo_atendimento = ?,
                descricao = ?,
                data_atendimento = ?,
                status = ?
            WHERE id = ?
        `, [
            beneficiarioId,
            campanhaId || null,
            tipoAtendimento,
            descricao || null,
            dataAtendimento,
            status,
            id
        ]);

        return resultado;
    },


    async excluir(id) {

        const [resultado] = await pool.execute(
            `DELETE FROM atendimentos
             WHERE id = ?`,
            [id]
        );

        return resultado;
    }

};

module.exports = Atendimento;