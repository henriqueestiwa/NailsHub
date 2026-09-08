import { criarServico, buscarServicoPorId, listarServicosAtivos } from "../src/servicos.js";

describe("criarServico", () => {

    test("deve criar um serviço com os dados informados", () => {
        const lista = [];

        const resultado = criarServico(
            lista,
            "Alongamento",
            150
        );

        expect(resultado.servico).toBe("Alongamento");
        expect(resultado.valor).toBe(150);
    });

    test("deve criar o serviço como ativo", () => {
        const lista = [];

        const resultado = criarServico(
            lista,
            "Alongamento",
            150
        );

        expect(resultado.ativo).toBe(true);
    });

    test("deve retornar um objeto representando o novo serviço", () => {
        const lista = [];

        const resultado = criarServico(
            lista,
            "Alongamento",
            150
        );

        expect(resultado).toEqual({
            id: 1,
            servico: "Alongamento",
            valor: 150,
            ativo: true,
            imagem: "foto1"
        });
    });

    test("deve utilizar o menor ID disponível da lista", () => {
        const lista = [
            { id: 1 },
            { id: 3 },
            { id: 4 }
        ];

        const resultado = criarServico(
            lista,
            "Remoção",
            60
        );

        expect(resultado.id).toBe(2);
    });

}); 

describe("buscarServicoPorId", () => {

    test("deve retornar o serviço correspondente ao ID informado", () => {
        const lista = [
            { id: 1, servico: "Alongamento", ativo: true },
            { id: 2, servico: "Manutenção", ativo: true }
        ];

        const resultado = buscarServicoPorId(lista, 2);

        expect(resultado).toEqual({
            id: 2,
            servico: "Manutenção",
            ativo: true
        });
    });

    test("deve aceitar o ID informado como texto", () => {
        const lista = [
            { id: 1, servico: "Alongamento", ativo: true }
        ];

        const resultado = buscarServicoPorId(lista, "1");

        expect(resultado.servico).toBe("Alongamento");
    });

    test("deve retornar undefined quando o ID não existir", () => {
        const lista = [
            { id: 1, servico: "Alongamento", ativo: true }
        ];

        const resultado = buscarServicoPorId(lista, 99);

        expect(resultado).toBeUndefined();
    });

});

describe("listarServicosAtivos", () => {

    test("deve retornar somente os serviços ativos", () => {
        const lista = [
            { id: 1, servico: "Alongamento", ativo: true },
            { id: 2, servico: "Manutenção", ativo: false },
            { id: 3, servico: "Remoção", ativo: true }
        ];

        const resultado = listarServicosAtivos(lista);

        expect(resultado).toEqual([
            { id: 1, servico: "Alongamento", ativo: true },
            { id: 3, servico: "Remoção", ativo: true }
        ]);
    });

    test("deve retornar uma lista vazia quando nenhum serviço estiver ativo", () => {
        const lista = [
            { id: 1, servico: "Alongamento", ativo: false },
            { id: 2, servico: "Manutenção", ativo: false }
        ];

        const resultado = listarServicosAtivos(lista);

        expect(resultado).toEqual([]);
    });

});