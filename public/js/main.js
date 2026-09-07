// ===============================
// MODO ESCURO
// ===============================

document.addEventListener('DOMContentLoaded', () => {

    const botaoTema =
        document.getElementById('toggle-tema');


    // Recupera a escolha salva
    const temaSalvo =
        localStorage.getItem('tema');


    if (temaSalvo === 'escuro') {

        document.body.classList.add(
            'modo-escuro'
        );

    }


    function atualizarTextoBotao() {

        if (!botaoTema) {
            return;
        }


        const modoEscuro =
            document.body.classList.contains(
                'modo-escuro'
            );


        botaoTema.textContent =
            modoEscuro
                ? 'Modo claro'
                : 'Modo escuro';

    }


    atualizarTextoBotao();


    if (botaoTema) {

        botaoTema.addEventListener(
            'click',
            () => {

                document.body.classList.toggle(
                    'modo-escuro'
                );


                const modoEscuro =
                    document.body.classList.contains(
                        'modo-escuro'
                    );


                localStorage.setItem(
                    'tema',
                    modoEscuro
                        ? 'escuro'
                        : 'claro'
                );


                atualizarTextoBotao();

            }
        );

    }

});
// ===============================
// MENU MOBILE
// ===============================

document.addEventListener('DOMContentLoaded', () => {

    const botaoMenu =
        document.getElementById('menu-toggle');

    const menu =
        document.getElementById('menu-principal');


    if (botaoMenu && menu) {

        botaoMenu.addEventListener('click', () => {

            const aberto =
                menu.classList.toggle('aberto');


            botaoMenu.setAttribute(
                'aria-expanded',
                aberto
            );


            botaoMenu.setAttribute(
                'aria-label',
                aberto
                    ? 'Fechar menu'
                    : 'Abrir menu'
            );

        });


        menu.querySelectorAll('a').forEach(link => {

            link.addEventListener('click', () => {

                menu.classList.remove('aberto');

                botaoMenu.setAttribute(
                    'aria-expanded',
                    'false'
                );

            });

        });


        document.addEventListener('keydown', event => {

            if (event.key === 'Escape') {

                menu.classList.remove('aberto');

                botaoMenu.setAttribute(
                    'aria-expanded',
                    'false'
                );

            }

        });

    }

});


// ===============================
// AVISO DE COOKIES
// ===============================

document.addEventListener('DOMContentLoaded', () => {

    const aviso =
        document.getElementById('cookie-banner');

    const botao =
        document.getElementById('aceitar-cookies');


    if (!aviso || !botao) {
        return;
    }


    const avisoAceito =
        localStorage.getItem(
            'solidarize_aviso_cookies'
        );


    if (!avisoAceito) {

        aviso.hidden = false;

    }


    botao.addEventListener('click', () => {

        localStorage.setItem(
            'solidarize_aviso_cookies',
            'aceito'
        );

        aviso.hidden = true;

    });

});
// ===============================
// DOAÇÃO - VALORES SUGERIDOS
// ===============================

document.addEventListener(
    'DOMContentLoaded',
    () => {

        const campoValor =
            document.getElementById('valor');


        const botoes =
            document.querySelectorAll(
                '[data-valor-doacao]'
            );


        botoes.forEach(botao => {

            botao.addEventListener(
                'click',
                () => {

                    if (!campoValor) {
                        return;
                    }


                    campoValor.value =
                        botao.dataset.valorDoacao;


                    campoValor.focus();

                }
            );

        });

    }
);


// ===============================
// COPIAR PIX
// ===============================

document.addEventListener(
    'DOMContentLoaded',
    () => {

        const botao =
            document.getElementById(
                'copiar-pix'
            );


        const chave =
            document.getElementById(
                'pix-chave'
            );


        const aviso =
            document.getElementById(
                'pix-copiado'
            );


        if (!botao || !chave) {
            return;
        }


        botao.addEventListener(
            'click',
            async () => {

                try {

                    await navigator.clipboard.writeText(
                        chave.textContent.trim()
                    );


                    if (aviso) {

                        aviso.hidden = false;

                    }


                    botao.textContent =
                        'Chave copiada';


                } catch (erro) {

                    console.error(
                        'Erro ao copiar PIX:',
                        erro
                    );

                }

            }
        );

    }
);
// ===============================
// DOAÇÃO - VALORES SUGERIDOS
// ===============================

document.addEventListener(
    'DOMContentLoaded',
    () => {

        const campoValor =
            document.getElementById('valor');


        const botoes =
            document.querySelectorAll(
                '[data-valor-doacao]'
            );


        botoes.forEach(botao => {

            botao.addEventListener(
                'click',
                () => {

                    if (!campoValor) {
                        return;
                    }


                    campoValor.value =
                        botao.dataset.valorDoacao;


                    campoValor.focus();

                }
            );

        });

    }
);


// ===============================
// COPIAR CHAVE PIX
// ===============================

document.addEventListener(
    'DOMContentLoaded',
    () => {

        const botao =
            document.getElementById(
                'copiar-pix'
            );


        const chave =
            document.getElementById(
                'pix-chave'
            );


        const aviso =
            document.getElementById(
                'pix-copiado'
            );


        if (!botao || !chave) {
            return;
        }


        botao.addEventListener(
            'click',
            async () => {

                try {

                    await navigator.clipboard.writeText(
                        chave.textContent.trim()
                    );


                    if (aviso) {
                        aviso.hidden = false;
                    }


                    botao.textContent =
                        'Chave copiada';


                } catch (erro) {

                    console.error(
                        'Erro ao copiar chave PIX:',
                        erro
                    );

                }

            }
        );

    }
);