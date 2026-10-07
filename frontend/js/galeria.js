const miniaturas = Array.from(document.querySelectorAll(".foto-miniatura"));
const visualizador = document.querySelector(".galeria-visualizador");
const fotos = miniaturas.map((botao) => ({ src: botao.dataset.foto, alt: botao.querySelector("img").alt }));
const fotoPrincipal = visualizador.querySelector(".galeria-foto-principal");
const anterior = visualizador.querySelector(".galeria-anterior");
const proxima = visualizador.querySelector(".galeria-proxima");
const posicao = visualizador.querySelector(".galeria-posicao");
const botaoModelo = visualizador.querySelector(".galeria-quero-modelo");
const faixa = visualizador.querySelector(".galeria-faixa");
let indiceAtual = 0;
let inicioToque = null;
let botaoOrigem = null;

function mostrarFoto() {
    const total = fotos.length;
    fotoPrincipal.src = fotos[indiceAtual].src;
    fotoPrincipal.alt = fotos[indiceAtual].alt;
    const linkFoto = new URL(fotos[indiceAtual].src, document.baseURI).href;
    const mensagem = "Gostei deste modelo, quero uma arte assim!\n\n" + linkFoto;
    botaoModelo.href = "https://wa.me/554797929626?text=" + encodeURIComponent(mensagem);
    posicao.textContent = String(indiceAtual + 1).padStart(2, "0") + " / " + String(total).padStart(2, "0");
    anterior.querySelector("img").src = fotos[(indiceAtual - 1 + total) % total].src;
    proxima.querySelector("img").src = fotos[(indiceAtual + 1) % total].src;
    anterior.hidden = total < 2;
    proxima.hidden = total < 2;
    faixa.querySelectorAll("button").forEach((botao, indice) => {
        botao.setAttribute("aria-pressed", String(indice === indiceAtual));
    });
}

function navegar(direcao) {
    indiceAtual = (indiceAtual + direcao + fotos.length) % fotos.length;
    mostrarFoto();
}

miniaturas.forEach((botao, indice) => {
    botao.addEventListener("click", () => {
        indiceAtual = indice;
        botaoOrigem = botao;
        mostrarFoto();
        visualizador.showModal();
        document.body.classList.add("visualizacao-aberta");
    });
    const seletor = document.createElement("button");
    seletor.type = "button";
    seletor.setAttribute("aria-label", "Ver fotografia " + (indice + 1));
    seletor.setAttribute("aria-pressed", "false");
    const imagem = document.createElement("img");
    imagem.src = fotos[indice].src;
    imagem.alt = "";
    seletor.appendChild(imagem);
    seletor.addEventListener("click", () => { indiceAtual = indice; mostrarFoto(); });
    faixa.appendChild(seletor);
});

document.querySelector(".galeria-total").textContent = fotos.length + (fotos.length === 1 ? " fotografia" : " fotografias");
anterior.addEventListener("click", () => navegar(-1));
proxima.addEventListener("click", () => navegar(1));
visualizador.querySelector(".galeria-fechar").addEventListener("click", () => visualizador.close());
visualizador.addEventListener("close", () => {
    document.body.classList.remove("visualizacao-aberta");
    inicioToque = null;
    if (botaoOrigem) botaoOrigem.focus({ preventScroll: true });
});
visualizador.addEventListener("click", (evento) => {
    if (evento.target === visualizador) visualizador.close();
});
visualizador.addEventListener("keydown", (evento) => {
    if (evento.key === "ArrowLeft" || evento.key === "ArrowRight") {
        evento.preventDefault();
        navegar(evento.key === "ArrowLeft" ? -1 : 1);
    }
});
fotoPrincipal.addEventListener("touchstart", (evento) => {
    inicioToque = evento.touches.length === 1 ? { x: evento.touches[0].clientX, y: evento.touches[0].clientY } : null;
}, { passive: true });
fotoPrincipal.addEventListener("touchend", (evento) => {
    if (!inicioToque) return;
    const dx = evento.changedTouches[0].clientX - inicioToque.x;
    const dy = evento.changedTouches[0].clientY - inicioToque.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) navegar(dx < 0 ? 1 : -1);
    inicioToque = null;
}, { passive: true });
fotoPrincipal.addEventListener("touchcancel", () => { inicioToque = null; });
