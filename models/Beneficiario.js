const pool = require('../config/database');


const Beneficiario = {

    // =====================================
    // LISTAR TODOS
    // =====================================

    async listarTodos() {

        const [beneficiarios] =
            await pool.execute(`
                SELECT *
                FROM beneficiarios
                ORDER BY id DESC
            `);


        return beneficiarios;

    },


    // =====================================
    // BUSCAR POR ID
    // =====================================

    async buscarPorId(id) {

        const [beneficiarios] =
            await pool.execute(
                `
                    SELECT *
                    FROM beneficiarios
                    WHERE id = ?
                `,
                [id]
            );


        return beneficiarios[0];

    },


    // =====================================
    // CRIAR
    // =====================================

    async criar(
        nome,
        telefone,
        endereco,
        observacoes,
        status
    ) {

        const [resultado] =
            await pool.execute(
                `
                    INSERT INTO beneficiarios
                    (
                        nome,
                        telefone,
                        endereco,
                        observacoes,
                        status
                    )
                    VALUES (?, ?, ?, ?, ?)
                `,
                [
                    nome,
                    telefone || null,
                    endereco || null,
                    observacoes || null,
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
        telefone,
        endereco,
        observacoes,
        status
    ) {

        const [resultado] =
            await pool.execute(
                `
                    UPDATE beneficiarios
                    SET
                        nome = ?,
                        telefone = ?,
                        endereco = ?,
                        observacoes = ?,
                        status = ?
                    WHERE id = ?
                `,
                [
                    nome,
                    telefone || null,
                    endereco || null,
                    observacoes || null,
                    status,
                    id
                ]
            );


        return resultado;

    },


    // =====================================
    // CONTAR ATENDIMENTOS VINCULADOS
    // =====================================

    async contarAtendimentos(id) {

        const [resultado] =
            await pool.execute(
                `
                    SELECT
                        COUNT(*) AS total
                    FROM atendimentos
                    WHERE beneficiario_id = ?
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
                    DELETE FROM beneficiarios
                    WHERE id = ?
                `,
                [id]
            );


        return resultado;

    }

};


module.exports = Beneficiario;