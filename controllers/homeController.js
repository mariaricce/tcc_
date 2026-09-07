const transporter = require('../config/email');
const Campanha = require('../models/Campanha');


// ========================================
// FUNÇÃO AUXILIAR
// ========================================

function escaparHtml(texto) {

    return String(texto)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

}


// ========================================
// HOME
// ========================================

exports.home = (req, res) => {

    res.render('home', {
        titulo: 'Instituto Solidarize'
    });

};


// ========================================
// SOBRE
// ========================================

exports.sobre = (req, res) => {

    res.render('sobre', {
        titulo: 'Sobre | Instituto Solidarize'
    });

};


// ========================================
// CAMPANHAS
// ========================================

exports.campanhas = async (req, res) => {

    try {

        const campanhas =
            await Campanha.listarAtivas();

        res.render('campanhas', {

            titulo:
                'Campanhas | Instituto Solidarize',

            campanhas

        });

    } catch (erro) {

        console.error(
            'Erro ao carregar campanhas:',
            erro
        );

        res.status(500).send(
            'Erro ao carregar campanhas.'
        );

    }

};


// ========================================
// COMO AJUDAR
// ========================================

exports.comoAjudar = (req, res) => {

    res.render('como-ajudar', {
        titulo: 'Como Ajudar | Instituto Solidarize'
    });

};


// ========================================
// CONTATO
// ========================================

exports.contato = (req, res) => {

    res.render('contato', {

        titulo:
            'Contato | Instituto Solidarize',

        sucesso:
            req.query.enviado === '1',

        erro:
            req.query.erro === '1'

    });

};


// ========================================
// ENVIAR CONTATO
// ========================================

exports.enviarContato = async (req, res) => {

    try {

        let {
            nome,
            email,
            assunto,
            mensagem
        } = req.body;


        if (
            !nome ||
            !email ||
            !assunto ||
            !mensagem
        ) {

            return res.redirect(
                '/contato?erro=1'
            );

        }


        nome = nome.trim();

        email = email
            .trim()
            .toLowerCase();

        assunto = assunto.trim();

        mensagem = mensagem.trim();


        const emailValido =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (
            nome.length < 2 ||
            assunto.length < 2 ||
            mensagem.length < 3 ||
            !emailValido.test(email)
        ) {

            return res.redirect(
                '/contato?erro=1'
            );

        }


        const nomeSeguro =
            escaparHtml(nome);

        const emailSeguro =
            escaparHtml(email);

        const assuntoSeguro =
            escaparHtml(assunto);

        const mensagemSegura =
            escaparHtml(mensagem)
                .replace(/\n/g, '<br>');


        await transporter.sendMail({

            from:
                `"Site Instituto Solidarize" <${process.env.EMAIL_USER}>`,

            to:
                process.env.EMAIL_USER,

            replyTo:
                email,

            subject:
                `Contato pelo site - ${assunto}`,

            text: `
Nova mensagem recebida pelo site do Instituto Solidarize.

Nome: ${nome}
E-mail: ${email}
Assunto: ${assunto}

Mensagem:

${mensagem}
            `,

            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6;">

                    <h2 style="color: #6d3fd4;">
                        Nova mensagem pelo site
                    </h2>

                    <p>
                        <strong>Nome:</strong>
                        ${nomeSeguro}
                    </p>

                    <p>
                        <strong>E-mail:</strong>
                        ${emailSeguro}
                    </p>

                    <p>
                        <strong>Assunto:</strong>
                        ${assuntoSeguro}
                    </p>

                    <p>
                        <strong>Mensagem:</strong>
                    </p>

                    <p>
                        ${mensagemSegura}
                    </p>

                </div>
            `

        });


        return res.redirect(
            '/contato?enviado=1'
        );


    } catch (erro) {

        console.error(
            'Erro ao enviar mensagem:',
            erro
        );

        return res.redirect(
            '/contato?erro=1'
        );

    }

};


// ========================================
// PRIVACIDADE E COOKIES
// ========================================

exports.privacidade = (req, res) => {

    res.render('privacidade', {

        titulo:
            'Privacidade e Cookies | Instituto Solidarize'

    });

};