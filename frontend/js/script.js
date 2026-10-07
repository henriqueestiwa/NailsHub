const gradeServicos = document.querySelector(".servicos-grade");

if (gradeServicos) {
    const servicos = Array.from(gradeServicos.querySelectorAll(".servico"));
    const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animacoes = [];

    function selecionarServico(selecionado, animar = true) {
        const posicoes = servicos.map((servico) => servico.getBoundingClientRect());
        animacoes.forEach((animacao) => animacao.cancel());
        animacoes = [];

        servicos.forEach((servico) => {
            const ativo = servico === selecionado;
            servico.classList.toggle("ativo", ativo);
            servico.querySelector(".servico-selecionar").setAttribute("aria-expanded", String(ativo));
            servico.querySelector(".servico-detalhes").hidden = !ativo;
            servico.querySelector(".servico-simbolo").textContent = ativo ? "−" : "+";
        });

        if (!animar || reduzirMovimento.matches) return;

        servicos.forEach((servico, indice) => {
            const antes = posicoes[indice];
            const depois = servico.getBoundingClientRect();
            animacoes.push(servico.animate([
                { transformOrigin: "top left", transform: "translate(" + (antes.left - depois.left) + "px, " + (antes.top - depois.top) + "px) scale(" + (antes.width / depois.width) + ", " + (antes.height / depois.height) + ")" },
                { transformOrigin: "top left", transform: "none" }
            ], { duration: 450, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }));
        });

    }

    servicos.forEach((servico) => {
        const botao = servico.querySelector(".servico-selecionar");
        botao.addEventListener("click", () => {
            if (!servico.classList.contains("ativo")) selecionarServico(servico);
        });
    });

    selecionarServico(servicos[0], false);
}

const contatoMenu = document.querySelector(".contato-menu");
if (contatoMenu) {
    const contatoToggle = contatoMenu.querySelector(".contato-toggle");
    const contatoLinks = contatoMenu.querySelector(".contato-links");

    function mostrarContato(aberto) {
        contatoToggle.setAttribute("aria-expanded", String(aberto));
        contatoLinks.hidden = !aberto;
    }

    contatoMenu.addEventListener("pointerenter", (evento) => {
        if (evento.pointerType === "mouse") mostrarContato(true);
    });
    contatoMenu.addEventListener("pointerleave", (evento) => {
        if (evento.pointerType === "mouse" && !contatoMenu.contains(document.activeElement)) mostrarContato(false);
    });
    contatoToggle.addEventListener("click", (evento) => {
        if (evento.detail > 0 && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
            mostrarContato(true);
        } else {
            mostrarContato(contatoLinks.hidden);
        }
    });
    contatoMenu.addEventListener("focusout", (evento) => {
        if (!contatoMenu.contains(evento.relatedTarget)) mostrarContato(false);
    });
    document.addEventListener("click", (evento) => {
        if (!contatoMenu.contains(evento.target)) mostrarContato(false);
    });
    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape" && !contatoLinks.hidden) {
            mostrarContato(false);
            contatoToggle.focus();
        }
    });
    contatoLinks.addEventListener("click", (evento) => {
        if (evento.target.closest("a")) mostrarContato(false);
    });
}

const carrosselGaleria = document.querySelector(".galeria-carrossel");
if (carrosselGaleria) {
    const imagens = Array.from(carrosselGaleria.querySelectorAll("img"));
    const indicadores = carrosselGaleria.querySelectorAll(".galeria-indicadores span");
    const contador = carrosselGaleria.querySelector(".galeria-contador");
    const botaoPausar = document.querySelector(".galeria-pausar");
    let fotoAtual = 0;
    let intervalo = null;
    let pausado = false;

    function mostrarFoto() {
        imagens.forEach((imagem, indice) => {
            const ativa = indice === fotoAtual;
            imagem.classList.toggle("ativa", ativa);
            imagem.setAttribute("aria-hidden", String(!ativa));
        });
        indicadores.forEach((indicador, indice) => indicador.classList.toggle("ativo", indice === fotoAtual));
        contador.textContent = String(fotoAtual + 1).padStart(2, "0") + " / " + String(imagens.length).padStart(2, "0");
    }

    function atualizarCarrossel() {
        clearInterval(intervalo);
        intervalo = null;
        if (imagens.length < 2 || document.hidden || pausado) return;
        intervalo = setInterval(() => {
            fotoAtual = (fotoAtual + 1) % imagens.length;
            mostrarFoto();
        }, 3500);
    }

    botaoPausar.addEventListener("click", () => {
        pausado = !pausado;
        botaoPausar.setAttribute("aria-pressed", String(pausado));
        botaoPausar.textContent = pausado ? "Retomar fotos" : "Pausar fotos";
        atualizarCarrossel();
    });
    document.addEventListener("visibilitychange", atualizarCarrossel);
    mostrarFoto();
    atualizarCarrossel();
}

const botoesCopiar = document.querySelectorAll(".copiar");
botoesCopiar.forEach((botao) => {
    botao.addEventListener("click", async () => {
        const texto = botao.dataset.texto;
        const status = document.querySelector(".copiar-status");
        let copiado = false;
        try {
            await navigator.clipboard.writeText(texto);
            copiado = true;
        } catch {
            const campo = document.createElement("textarea");
            campo.value = texto;
            campo.style.position = "fixed";
            campo.style.opacity = "0";
            document.body.appendChild(campo);
            campo.select();
            try { copiado = document.execCommand("copy"); } catch { copiado = false; }
            campo.remove();
            botao.focus();
        }
        botao.textContent = copiado ? "Copiado" : "Tentar novamente";
        status.textContent = copiado ? "Copiado: " + texto : "Não foi possível copiar. Selecione o texto e copie manualmente.";
    });
});
