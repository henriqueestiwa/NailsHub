import { criarAvaliacao, calcularMediaAvaliacoes } from "../src/avaliacoes.js";

describe("criarAvaliacao", () => {

    test("deve criar uma avaliação válida", () => {
        const resultado = criarAvaliacao(
            1,
            5,
            "Ótimo atendimento"
        );

        expect(resultado).toEqual({
            id: 1,
            nota: 5,
            comentario: "Ótimo atendimento"
        });
    });

    test("deve aceitar nota mínima igual a 0", () => {
        const resultado = criarAvaliacao(1, 0);

        expect(resultado.nota).toBe(0);
    });

    test("deve aceitar nota máxima igual a 5", () => {
        const resultado = criarAvaliacao(1, 5);

        expect(resultado.nota).toBe(5);
    });

    test("deve lançar exceção quando a nota for menor que 0", () => {
        expect(() => {
            criarAvaliacao(1, -1);
        }).toThrow("A nota deve estar entre 0 e 5.");
    });

    test("deve lançar exceção quando a nota for maior que 5", () => {
        expect(() => {
            criarAvaliacao(1, 6);
        }).toThrow("A nota deve estar entre 0 e 5.");
    });

    test("deve utilizar comentário vazio quando nenhum comentário for informado", () => {
        const resultado = criarAvaliacao(1, 4);

        expect(resultado.comentario).toBe("");
    });

});

describe("calcularMediaAvaliacoes", () => {

    test("deve calcular a média das avaliações", () => {
        const lista = [
            { nota: 5 },
            { nota: 4 },
            { nota: 3 }
        ];

        const resultado = calcularMediaAvaliacoes(lista);

        expect(resultado).toBe(4);
    });

    test("deve retornar 0 quando não houver avaliações", () => {
        const resultado = calcularMediaAvaliacoes([]);

        expect(resultado).toBe(0);
    });

});