const pool = require('../config/database');

const Beneficiario = {

    async listarTodos() {

        const [beneficiarios] = await pool.execute(`
            SELECT *
            FROM beneficiarios
            ORDER BY id DESC
        `);

        return beneficiarios;
    },


    async buscarPorId(id) {

        const [beneficiarios] = await pool.execute(
            `SELECT *
             FROM beneficiarios
             WHERE id = ?`,
            [id]
        );

        return beneficiarios[0];
    },


    async criar(
        nome,
        telefone,
        endereco,
        observacoes,
        status
    ) {

        const [resultado] = await pool.execute(`
            INSERT INTO beneficiarios
            (
                nome,
                telefone,
                endereco,
                observacoes,
                status
            )
            VALUES (?, ?, ?, ?, ?)
        `, [
            nome,
            telefone || null,
            endereco || null,
            observacoes || null,
            status
        ]);

        return resultado;
    },


    async atualizar(
        id,
        nome,
        telefone,
        endereco,
        observacoes,
        status
    ) {

        const [resultado] = await pool.execute(`
            UPDATE beneficiarios
            SET
                nome = ?,
                telefone = ?,
                endereco = ?,
                observacoes = ?,
                status = ?
            WHERE id = ?
        `, [
            nome,
            telefone || null,
            endereco || null,
            observacoes || null,
            status,
            id
        ]);

        return resultado;
    },


    async excluir(id) {

        const [resultado] = await pool.execute(
            `DELETE FROM beneficiarios
             WHERE id = ?`,
            [id]
        );

        return resultado;
    }

};


module.exports = Beneficiario;