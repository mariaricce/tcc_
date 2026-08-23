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