const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');


// ===============================
// EXIBIR CADASTRO
// ===============================

exports.exibirCadastro = (req, res) => {

    res.render('cadastro', {
        titulo: 'Criar Conta | Instituto Solidarize',
        erro: null,
        sucesso: null
    });

};


// ===============================
// CADASTRAR USUÁRIO
// ===============================

exports.cadastrar = async (req, res) => {

    try {

        let {
            nome,
            email,
            senha,
            confirmar_senha
        } = req.body;


        // ===============================
        // CAMPOS OBRIGATÓRIOS
        // ===============================

        if (
            !nome ||
            !email ||
            !senha ||
            !confirmar_senha
        ) {

            return res.render('cadastro', {
                titulo: 'Criar Conta | Instituto Solidarize',
                erro: 'Preencha todos os campos.',
                sucesso: null
            });

        }


        // Limpar dados
        nome = nome.trim();
        email = email.trim().toLowerCase();


        // ===============================
        // VALIDAR NOME
        // ===============================

        if (nome.length < 3) {

            return res.render('cadastro', {
                titulo: 'Criar Conta | Instituto Solidarize',
                erro: 'Informe um nome válido.',
                sucesso: null
            });

        }


        // ===============================
        // VALIDAR E-MAIL
        // ===============================

        const emailValido =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailValido.test(email)) {

            return res.render('cadastro', {
                titulo: 'Criar Conta | Instituto Solidarize',
                erro: 'Informe um e-mail válido.',
                sucesso: null
            });

        }


        // ===============================
        // VALIDAR SENHA
        // ===============================

        if (senha.length < 6) {

            return res.render('cadastro', {
                titulo: 'Criar Conta | Instituto Solidarize',
                erro: 'A senha deve possuir pelo menos 6 caracteres.',
                sucesso: null
            });

        }


        // ===============================
        // CONFIRMAR SENHA
        // ===============================

        if (senha !== confirmar_senha) {

            return res.render('cadastro', {
                titulo: 'Criar Conta | Instituto Solidarize',
                erro: 'As senhas não coincidem.',
                sucesso: null
            });

        }


        // ===============================
        // VERIFICAR E-MAIL CADASTRADO
        // ===============================

        const usuarioExistente =
            await Usuario.buscarPorEmail(email);


        if (usuarioExistente) {

            return res.render('cadastro', {
                titulo: 'Criar Conta | Instituto Solidarize',
                erro: 'Este e-mail já está cadastrado.',
                sucesso: null
            });

        }


        // ===============================
        // CRIPTOGRAFAR SENHA
        // ===============================

        const senhaCriptografada =
            await bcrypt.hash(senha, 10);


        // ===============================
        // CRIAR USUÁRIO
        // ===============================

        await Usuario.criar(
            nome,
            email,
            senhaCriptografada
        );


        return res.redirect(
            '/login?cadastro=sucesso'
        );


    } catch (erro) {

        console.error(
            'Erro ao cadastrar usuário:',
            erro
        );


        return res.render('cadastro', {
            titulo: 'Criar Conta | Instituto Solidarize',
            erro: 'Não foi possível realizar o cadastro.',
            sucesso: null
        });

    }

};


// ===============================
// EXIBIR LOGIN
// ===============================

exports.exibirLogin = (req, res) => {

    if (req.session.usuario) {

        if (
            req.session.usuario.tipo === 'admin'
        ) {

            return res.redirect('/admin');

        }


        return res.redirect('/usuario');

    }


    const cadastroRealizado =
        req.query.cadastro === 'sucesso';


    res.render('login', {

        titulo: 'Login | Instituto Solidarize',

        erro: null,

        sucesso: cadastroRealizado
            ? 'Conta criada com sucesso! Faça seu login.'
            : null

    });

};


// ===============================
// REALIZAR LOGIN
// ===============================

exports.login = async (req, res) => {

    try {

        let {
            email,
            senha
        } = req.body;


        // ===============================
        // CAMPOS OBRIGATÓRIOS
        // ===============================

        if (!email || !senha) {

            return res.render('login', {
                titulo: 'Login | Instituto Solidarize',
                erro: 'Informe o e-mail e a senha.',
                sucesso: null
            });

        }


        // Limpar e padronizar e-mail
        email = email.trim().toLowerCase();


        // ===============================
        // PROCURAR USUÁRIO
        // ===============================

        const usuario =
            await Usuario.buscarPorEmail(email);


        if (!usuario) {

            return res.render('login', {
                titulo: 'Login | Instituto Solidarize',
                erro: 'E-mail ou senha incorretos.',
                sucesso: null
            });

        }


        // ===============================
        // VERIFICAR STATUS
        // ===============================

        if (usuario.status !== 'Ativo') {

            return res.render('login', {
                titulo: 'Login | Instituto Solidarize',
                erro: 'Esta conta está inativa.',
                sucesso: null
            });

        }


        // ===============================
        // VERIFICAR SENHA
        // ===============================

        const senhaCorreta =
            await bcrypt.compare(
                senha,
                usuario.senha
            );


        if (!senhaCorreta) {

            return res.render('login', {
                titulo: 'Login | Instituto Solidarize',
                erro: 'E-mail ou senha incorretos.',
                sucesso: null
            });

        }


        // ===============================
        // CRIAR SESSÃO
        // ===============================

        req.session.usuario = {

            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            tipo: usuario.tipo

        };


        // ===============================
        // SALVAR SESSÃO
        // ===============================

        req.session.save((erro) => {

            if (erro) {

                console.error(
                    'Erro ao salvar sessão:',
                    erro
                );


                return res.render('login', {
                    titulo: 'Login | Instituto Solidarize',
                    erro: 'Erro ao iniciar a sessão.',
                    sucesso: null
                });

            }


            // ADMIN
            if (usuario.tipo === 'admin') {

                return res.redirect('/admin');

            }


            // USUÁRIO NORMAL
            return res.redirect('/usuario');

        });


    } catch (erro) {

        console.error(
            'Erro no login:',
            erro
        );


        return res.render('login', {
            titulo: 'Login | Instituto Solidarize',
            erro: 'Não foi possível realizar o login.',
            sucesso: null
        });

    }

};


// ===============================
// LOGOUT
// ===============================

exports.logout = (req, res) => {

    req.session.destroy((erro) => {

        if (erro) {

            console.error(
                'Erro ao encerrar sessão:',
                erro
            );

            return res.redirect('/');

        }


        res.clearCookie('connect.sid');

        return res.redirect('/login');

    });

};