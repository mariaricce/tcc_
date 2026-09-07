const multer = require('multer');
const path = require('path');


// ========================================
// CONFIGURAÇÃO DE ARMAZENAMENTO
// ========================================

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(
            null,
            path.join(
                __dirname,
                '../public/images/campanhas'
            )
        );

    },


    filename: (req, file, cb) => {

        const extensao =
            path.extname(file.originalname)
                .toLowerCase();


        const nomeArquivo =
            `campanha-${Date.now()}-${Math.round(
                Math.random() * 1E9
            )}${extensao}`;


        cb(
            null,
            nomeArquivo
        );

    }

});


// ========================================
// FILTRAR TIPOS DE ARQUIVO
// ========================================

const fileFilter = (
    req,
    file,
    cb
) => {

    const tiposPermitidos = [
        'image/jpeg',
        'image/png',
        'image/webp'
    ];


    if (
        tiposPermitidos.includes(
            file.mimetype
        )
    ) {

        cb(
            null,
            true
        );

    } else {

        cb(
            new Error(
                'Envie apenas imagens JPG, PNG ou WEBP.'
            ),
            false
        );

    }

};


// ========================================
// CONFIGURAÇÃO DO MULTER
// ========================================

const uploadCampanha = multer({

    storage,

    fileFilter,

    limits: {

        fileSize:
            5 * 1024 * 1024

    }

});


module.exports = uploadCampanha;