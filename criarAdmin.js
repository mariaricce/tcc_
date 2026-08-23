require('dotenv').config();

const bcrypt = require('bcryptjs');
const pool = require('./config/database');

async function criarAdmin() {

    try {

        const nome = 'Administrador Solidarize';
        const email = 'admin@solidarize.com';
        const senha = '123456';

        // Verificar se o administrador já existe
        const [usuarios] = await pool.execute(
            'SELECT id FROM usuarios WHERE email = ?',
            [email]
        );

        if (usuarios.length > 0) {

            console.log(' Já existe um usuário com esse e-mail.');

            await pool.end();
            return;
        }


        // Criptografar a senha
        const senhaCriptografada =
            await bcrypt.hash(senha, 10);


        // Criar administrador
        await pool.execute(
            `INSERT INTO usuarios
            (nome, email, senha, tipo, status)
            VALUES (?, ?, ?, 'admin', 'Ativo')`,
            [
                nome,
                email,
                senhaCriptografada
            ]
        );


        console.log('✅ Administrador criado com sucesso!');
        console.log('📧 E-mail: admin@solidarize.com');
        console.log('🔑 Senha: 123456');


    } catch (erro) {

        console.error(
            ' Erro ao criar administrador:',
            erro.message
        );

    } finally {

        await pool.end();

    }

}


criarAdmin();