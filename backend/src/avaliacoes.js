export function criarAvaliacao(id, nota, comentario = "") {

    if (nota < 0 || nota > 5) {
        throw new Error("A nota deve estar entre 0 e 5.");
    }

    return {
        id,
        nota,
        comentario
    };
}

export function calcularMediaAvaliacoes(lista) {

    if (lista.length === 0) {
        return 0;
    }

    const soma = lista.reduce((total, avaliacao) => {
        return total + avaliacao.nota;    
    }, 0);

    return soma / lista.length;
}