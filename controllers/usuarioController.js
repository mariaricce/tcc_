exports.painel = (req, res) => {

    res.render('usuario/painel', {

        titulo: 'Minha Conta | Instituto Solidarize',

        usuario: req.session.usuario

    });

};