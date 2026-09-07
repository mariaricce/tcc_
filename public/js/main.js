// =========================================================
// INSTITUTO SOLIDARIZE
// JAVASCRIPT PRINCIPAL
// =========================================================


// =========================================================
// MODO ESCURO
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

    const botaoTema =
        document.getElementById('btn-tema');

    const temaSalvo =
        localStorage.getItem('tema');


    if (temaSalvo === 'escuro') {

        document.body.classList.add(
            'modo-escuro'
        );

    }


    function atualizarBotaoTema() {

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


        botaoTema.setAttribute(
            'aria-pressed',
            modoEscuro
                ? 'true'
                : 'false'
        );

    }


    atualizarBotaoTema();


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


                atualizarBotaoTema();

            }
        );

    }

});


// =========================================================
// MENU MOBILE
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

    const botaoMenu =
        document.getElementById(
            'menu-toggle'
        );

    const menu =
        document.getElementById(
            'menu-principal'
        );


    if (!botaoMenu || !menu) {
        return;
    }


    botaoMenu.addEventListener(
        'click',
        () => {

            const aberto =
                menu.classList.toggle(
                    'aberto'
                );


            botaoMenu.setAttribute(
                'aria-expanded',
                aberto
                    ? 'true'
                    : 'false'
            );


            botaoMenu.setAttribute(
                'aria-label',
                aberto
                    ? 'Fechar menu'
                    : 'Abrir menu'
            );

        }
    );


    menu
        .querySelectorAll('a')
        .forEach(link => {

            link.addEventListener(
                'click',
                () => {

                    menu.classList.remove(
                        'aberto'
                    );


                    botaoMenu.setAttribute(
                        'aria-expanded',
                        'false'
                    );


                    botaoMenu.setAttribute(
                        'aria-label',
                        'Abrir menu'
                    );

                }
            );

        });


    document.addEventListener(
        'keydown',
        event => {

            if (event.key === 'Escape') {

                menu.classList.remove(
                    'aberto'
                );


                botaoMenu.setAttribute(
                    'aria-expanded',
                    'false'
                );


                botaoMenu.setAttribute(
                    'aria-label',
                    'Abrir menu'
                );

            }

        }
    );

});


// =========================================================
// AVISO DE COOKIES
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

    const aviso =
        document.getElementById(
            'cookie-banner'
        );

    const botaoAceitar =
        document.getElementById(
            'aceitar-cookies'
        );


    if (!aviso || !botaoAceitar) {
        return;
    }


    const cookiesAceitos =
        sessionStorage.getItem(
            'solidarize_cookies_aceitos'
        );


    if (cookiesAceitos === 'sim') {

        aviso.hidden = true;

    } else {

        aviso.hidden = false;

    }


    botaoAceitar.addEventListener(
        'click',
        () => {

            sessionStorage.setItem(
                'solidarize_cookies_aceitos',
                'sim'
            );


            aviso.hidden = true;

        }
    );

});


// =========================================================
// DOAÇÃO - VALORES SUGERIDOS
// =========================================================

document.addEventListener(
    'DOMContentLoaded',
    () => {

        const campoValor =
            document.getElementById(
                'valor'
            );


        const botoes =
            document.querySelectorAll(
                '[data-valor-doacao]'
            );


        if (!campoValor) {
            return;
        }


        botoes.forEach(botao => {

            botao.addEventListener(
                'click',
                () => {

                    campoValor.value =
                        botao.dataset.valorDoacao;


                    campoValor.focus();

                }
            );

        });

    }
);


// =========================================================
// COPIAR CHAVE PIX
// =========================================================

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

                    await navigator
                        .clipboard
                        .writeText(
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