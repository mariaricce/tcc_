const pool = require('../config/database');

const Participacao = {

    async listarTodas() {

        const [participacoes] = await pool.execute(`
            SELECT
                p.id,
                p.voluntario_id,
                p.campanha_id,
                p.data_inscricao,
                p.status,
                v.nome AS voluntario,
                c.titulo AS campanha
            FROM participacoes p
            INNER JOIN voluntarios v
                ON p.voluntario_id = v.id
            INNER JOIN campanhas c
                ON p.campanha_id = c.id
            ORDER BY p.id DESC
        `);

        return participacoes;
    },


    async buscarPorId(id) {

        const [participacoes] = await pool.execute(`
            SELECT *
            FROM participacoes
            WHERE id = ?
        `, [id]);

        return participacoes[0];
    },


    async criar(voluntarioId, campanhaId, status) {

        const [resultado] = await pool.execute(`
            INSERT INTO participacoes
            (
                voluntario_id,
                campanha_id,
                status
            )
            VALUES (?, ?, ?)
        `, [
            voluntarioId,
            campanhaId,
            status
        ]);

        return resultado;
    },


    async atualizar(
        id,
        voluntarioId,
        campanhaId,
        status
    ) {

        const [resultado] = await pool.execute(`
            UPDATE participacoes
            SET
                voluntario_id = ?,
                campanha_id = ?,
                status = ?
            WHERE id = ?
        `, [
            voluntarioId,
            campanhaId,
            status,
            id
        ]);

        return resultado;
    },


    async excluir(id) {

        const [resultado] = await pool.execute(
            `DELETE FROM participacoes
             WHERE id = ?`,
            [id]
        );

        return resultado;
    }

};

module.exports = Participacao;