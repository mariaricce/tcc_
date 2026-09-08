require('dotenv').config({
    quiet: true
});

const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');


async function criarAdmin() {

    let connection = null;

    try {

        // =====================================================
        // DADOS DO ADMINISTRADOR
        // =====================================================

        const nome = process.env.ADMIN_NOME?.trim();
        const email = process.env.ADMIN_EMAIL?.trim();
        const senha = process.env.ADMIN_SENHA;


        // =====================================================
        // VALIDAR CONFIGURAÇÕES
        // =====================================================

        if (!nome || !email || !senha) {

            console.error(
                'Configure ADMIN_NOME, ADMIN_EMAIL e ADMIN_SENHA no arquivo .env.'
            );

            return;
        }


        if (senha.length < 8) {

            console.error(
                'A senha do administrador deve possuir pelo menos 8 caracteres.'
            );

            return;
        }


        // =====================================================
        // CONECTAR AO BANCO
        // =====================================================

        connection = await mysql.createConnection({

            host: process.env.DB_HOST,

            user: process.env.DB_USER,

            password: process.env.DB_PASSWORD,

            database: process.env.DB_NAME,

            port: process.env.DB_PORT

        });


        console.log(
            'Banco de dados conectado com sucesso.'
        );


        // =====================================================
        // VERIFICAR SE O USUÁRIO JÁ EXISTE
        // =====================================================

        const [usuarios] = await connection.execute(
            `
                SELECT
                    id,
                    nome,
                    email,
                    tipo
                FROM usuarios
                WHERE email = ?
                LIMIT 1
            `,
            [email]
        );


        if (usuarios.length > 0) {

            const usuarioExistente = usuarios[0];

            console.log(
                `Já existe um usuário cadastrado com o e-mail ${usuarioExistente.email}.`
            );

            console.log(
                `Tipo da conta: ${usuarioExistente.tipo}.`
            );

            return;
        }


        // =====================================================
        // GERAR HASH DA SENHA
        // =====================================================

        const senhaHash = await bcrypt.hash(
            senha,
            10
        );


        // =====================================================
        // CRIAR ADMINISTRADOR
        // =====================================================

        await connection.execute(
            `
                INSERT INTO usuarios
                (
                    nome,
                    email,
                    senha,
                    tipo,
                    status
                )
                VALUES
                (
                    ?,
                    ?,
                    ?,
                    'admin',
                    'Ativo'
                )
            `,
            [
                nome,
                email,
                senhaHash
            ]
        );


        console.log(
            'Administrador criado com sucesso.'
        );

        console.log(
            `E-mail: ${email}`
        );


    } catch (erro) {

        console.error(
            'Erro ao criar administrador:',
            erro.message
        );


    } finally {

        // Fecha somente a conexão criada por este script.

        if (connection) {

            await connection.end();

        }

    }

}


criarAdmin();