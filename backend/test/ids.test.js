import { gerarMenorIdDisponivel } from "../src/ids.js";

describe("gerarMenorIdDisponivel", () => {

    test("deve retornar 4 quando os IDs 1, 2 e 3 estão ocupados", () => {

        const lista = [
            { id: 1 },
            { id: 2 },
            { id: 3 }
        ];

        const resultado = gerarMenorIdDisponivel(lista);

        expect(resultado).toBe(4);
    });

    test("deve retornar 2 quando o ID 2 estiver disponível", () => {

    const lista = [
        { id: 1 },
        { id: 3 },
        { id: 4 }
    ];

    const resultado = gerarMenorIdDisponivel(lista);

    expect(resultado).toBe(2);
});

    test("deve retornar 1 quando a lista estiver vazia", () => {

        const lista = [];

        const resultado = gerarMenorIdDisponivel(lista);

        expect(resultado).toBe(1);
    });

    test("deve retornar 1 quando nenhum item possuir o ID 1", () => {

        const lista = [
            { id: 2 },
            { id: 3 },
            { id: 4 }
        ];

        const resultado = gerarMenorIdDisponivel(lista);

        expect(resultado).toBe(1);
    });

});