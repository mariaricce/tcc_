exports.home = (req, res) => {
    res.render('home', {
        titulo: 'Instituto Solidarize'
    });
};

exports.sobre = (req, res) => {
    res.render('sobre', {
        titulo: 'Sobre | Instituto Solidarize'
    });
};

exports.campanhas = (req, res) => {
    res.render('campanhas', {
        titulo: 'Campanhas | Instituto Solidarize'
    });
};

exports.comoAjudar = (req, res) => {
    res.render('como-ajudar', {
        titulo: 'Como Ajudar | Instituto Solidarize'
    });
};

exports.contato = (req, res) => {
    res.render('contato', {
        titulo: 'Contato | Instituto Solidarize'
    });
};
const transporter = require('../config/email');


exports.home = (req, res) => {
    res.render('home', {
        titulo: 'Início'
    });
};


exports.sobre = (req, res) => {
    res.render('sobre', {
        titulo: 'Sobre'
    });
};


exports.comoAjudar = (req, res) => {
    res.render('como-ajudar', {
        titulo: 'Como Ajudar'
    });
};


exports.contato = (req, res) => {

    res.render('contato', {
        titulo: 'Contato',
        sucesso: req.query.enviado === '1',
        erro: req.query.erro === '1'
    });

};


exports.enviarContato = async (req, res) => {

    try {

        const {
            nome,
            email,
            assunto,
            mensagem
        } = req.body;


        if (!nome || !email || !assunto || !mensagem) {

            return res.redirect('/contato?erro=1');

        }


        await transporter.sendMail({

            from: `"Site Instituto Solidarize" <${process.env.EMAIL_USER}>`,

            to: process.env.EMAIL_USER,

            replyTo: email,

            subject: `Contato pelo site - ${assunto}`,

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
                        ${nome}
                    </p>

                    <p>
                        <strong>E-mail:</strong>
                        ${email}
                    </p>

                    <p>
                        <strong>Assunto:</strong>
                        ${assunto}
                    </p>

                    <p>
                        <strong>Mensagem:</strong>
                    </p>

                    <p>
                        ${mensagem}
                    </p>

                </div>
            `
        });


        return res.redirect('/contato?enviado=1');


    } catch (erro) {

        console.error('Erro ao enviar mensagem:', erro);

        return res.redirect('/contato?erro=1');

    }

};