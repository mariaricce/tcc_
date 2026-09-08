const pool = require('../config/database');


const Voluntario = {

    // =====================================
    // LISTAR TODOS
    // =====================================

    async listarTodos() {

        const [voluntarios] =
            await pool.execute(`
                SELECT *
                FROM voluntarios
                ORDER BY id DESC
            `);


        return voluntarios;

    },


    // =====================================
    // BUSCAR POR ID
    // =====================================

    async buscarPorId(id) {

        const [voluntarios] =
            await pool.execute(
                `
                    SELECT *
                    FROM voluntarios
                    WHERE id = ?
                `,
                [id]
            );


        return voluntarios[0];

    },


    // =====================================
    // BUSCAR POR E-MAIL
    // =====================================

    async buscarPorEmail(email) {

        const [voluntarios] =
            await pool.execute(
                `
                    SELECT *
                    FROM voluntarios
                    WHERE email = ?
                `,
                [email]
            );


        return voluntarios[0];

    },


    // =====================================
    // CRIAR
    // =====================================

    async criar(
        nome,
        email,
        telefone,
        areaInteresse,
        disponibilidade,
        status = 'Ativo'
    ) {

        const [resultado] =
            await pool.execute(
                `
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
                `,
                [
                    nome,
                    email,
                    telefone || null,
                    areaInteresse || null,
                    disponibilidade || null,
                    status
                ]
            );


        return resultado;

    },


    // =====================================
    // ATUALIZAR
    // =====================================

    async atualizar(
        id,
        nome,
        email,
        telefone,
        areaInteresse,
        disponibilidade,
        status
    ) {

        const [resultado] =
            await pool.execute(
                `
                    UPDATE voluntarios
                    SET
                        nome = ?,
                        email = ?,
                        telefone = ?,
                        area_interesse = ?,
                        disponibilidade = ?,
                        status = ?
                    WHERE id = ?
                `,
                [
                    nome,
                    email,
                    telefone || null,
                    areaInteresse || null,
                    disponibilidade || null,
                    status,
                    id
                ]
            );


        return resultado;

    },


    // =====================================
    // CONTAR PARTICIPAÇÕES VINCULADAS
    // =====================================

    async contarParticipacoes(id) {

        const [resultado] =
            await pool.execute(
                `
                    SELECT
                        COUNT(*) AS total
                    FROM participacoes
                    WHERE voluntario_id = ?
                `,
                [id]
            );


        return Number(
            resultado[0].total
        );

    },


    // =====================================
    // EXCLUIR
    // =====================================

    async excluir(id) {

        const [resultado] =
            await pool.execute(
                `
                    DELETE FROM voluntarios
                    WHERE id = ?
                `,
                [id]
            );


        return resultado;

    }

};


module.exports = Voluntario;