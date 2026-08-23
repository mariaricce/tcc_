const pool = require('../config/database');

const Voluntario = {

    async listarTodos() {

        const [voluntarios] = await pool.execute(`
            SELECT *
            FROM voluntarios
            ORDER BY id DESC
        `);

        return voluntarios;
    },


    async buscarPorId(id) {

        const [voluntarios] = await pool.execute(
            `SELECT *
             FROM voluntarios
             WHERE id = ?`,
            [id]
        );

        return voluntarios[0];
    },


    async buscarPorEmail(email) {

        const [voluntarios] = await pool.execute(
            `SELECT *
             FROM voluntarios
             WHERE email = ?`,
            [email]
        );

        return voluntarios[0];
    },


    async criar(
        nome,
        email,
        telefone,
        areaInteresse,
        disponibilidade,
        status = 'Ativo'
    ) {

        const [resultado] = await pool.execute(`
            INSERT INTO voluntarios
            (
                nome,
                email,
                telefone,
                area_interesse,
                disponibilidade,
                status
            )
            VALUES (?, ?, ?, ?, ?, ?)
        `, [
            nome,
            email,
            telefone || null,
            areaInteresse || null,
            disponibilidade || null,
            status
        ]);

        return resultado;
    },


    async atualizar(
        id,
        nome,
        email,
        telefone,
        areaInteresse,
        disponibilidade,
        status
    ) {

        const [resultado] = await pool.execute(`
            UPDATE voluntarios
            SET
                nome = ?,
                email = ?,
                telefone = ?,
                area_interesse = ?,
                disponibilidade = ?,
                status = ?
            WHERE id = ?
        `, [
            nome,
            email,
            telefone || null,
            areaInteresse || null,
            disponibilidade || null,
            status,
            id
        ]);

        return resultado;
    },


    async excluir(id) {

        const [resultado] = await pool.execute(
            `DELETE FROM voluntarios
             WHERE id = ?`,
            [id]
        );

        return resultado;
    }

};


module.exports = Voluntario;