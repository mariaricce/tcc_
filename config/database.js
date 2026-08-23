const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function testarConexao() {
    try {
        const connection = await pool.getConnection();

        console.log('✅ Banco de dados conectado com sucesso!');
        console.log(`📦 Banco conectado: ${process.env.DB_NAME}`);

        connection.release();
    } catch (erro) {
        console.error('❌ Erro ao conectar ao banco de dados:');
        console.error(erro.message);
    }
}

testarConexao();

module.exports = pool;