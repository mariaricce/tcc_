require('dotenv').config();

const express = require('express');
const path = require('path');
const session = require('express-session');

const pool = require('./config/database');

const app = express();

const PORT =
    process.env.PORT || 8000;


// ===============================
// EJS
// ===============================

app.set(
    'view engine',
    'ejs'
);

app.set(
    'views',
    path.join(__dirname, 'views')
);


// ===============================
// ARQUIVOS PÚBLICOS
// ===============================

app.use(
    express.static(
        path.join(__dirname, 'public')
    )
);


// ===============================
// FORMULÁRIOS
// ===============================

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(
    express.json()
);


// ===============================
// SESSÃO
// ===============================

app.use(

    session({

        secret:
            process.env.SESSION_SECRET,

        resave: false,

        saveUninitialized: false,

        cookie: {

            httpOnly: true,

            sameSite: 'lax',

            secure: false,

            maxAge:
                1000 * 60 * 60 * 2

        }

    })

);


// ===============================
// USUÁRIO LOGADO NAS VIEWS
// ===============================

app.use((req, res, next) => {

    res.locals.usuarioLogado =
        req.session.usuario || null;

    next();

});


// ===============================
// ROTAS
// ===============================

const homeRoutes =
    require('./routes/homeRoutes');

const authRoutes =
    require('./routes/authRoutes');

const usuarioRoutes =
    require('./routes/usuarioRoutes');

const adminRoutes =
    require('./routes/adminRoutes');

const campanhaRoutes =
    require('./routes/campanhaRoutes');

const voluntarioRoutes =
    require('./routes/voluntarioRoutes');

const beneficiarioRoutes =
    require('./routes/beneficiarioRoutes');

const doacaoRoutes =
    require('./routes/doacaoRoutes');

const participacaoRoutes =
    require('./routes/participacaoRoutes');

const atendimentoRoutes =
    require('./routes/atendimentoRoutes');


app.use('/', homeRoutes);
app.use('/', authRoutes);
app.use('/', usuarioRoutes);
app.use('/', adminRoutes);
app.use('/', campanhaRoutes);
app.use('/', voluntarioRoutes);
app.use('/', beneficiarioRoutes);
app.use('/', doacaoRoutes);
app.use('/', participacaoRoutes);
app.use('/', atendimentoRoutes);


// ===============================
// SERVIDOR
// ===============================

app.listen(PORT, () => {

    console.log(
        `Servidor rodando em http://localhost:${PORT}`
    );

});