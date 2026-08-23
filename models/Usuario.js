const pool = require('../config/database');

const Usuario = {

    async buscarPorEmail(email) {
        const [resultado] = await pool.execute(
            'SELECT * FROM usuarios WHERE email = ?',
            [email]
        );

        return resultado[0];
    },


    async criar(nome, email, senha) {
        const [resultado] = await pool.execute(
            `INSERT INTO usuarios
            (nome, email, senha, tipo, status)
            VALUES (?, ?, ?, 'usuario', 'Ativo')`,
            [nome, email, senha]
        );

        return resultado;
    }

};

module.exports = Usuario;