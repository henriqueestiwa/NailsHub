export function gerarMenorIdDisponivel(lista) {
    let novoId = 1;

    while (lista.some(item => item.id === novoId)) {
        novoId++;
    }

    return novoId;
}