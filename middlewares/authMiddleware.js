exports.autenticado = (req, res, next) => {

    if (!req.session.usuario) {

        return res.redirect('/login');

    }

    next();

};


exports.somenteAdmin = (req, res, next) => {

    if (!req.session.usuario) {

        return res.redirect('/login');

    }


    if (req.session.usuario.tipo !== 'admin') {

        return res.redirect('/usuario');

    }


    next();

};