import { criarCliente, buscarClientePorId } from "../src/clientes.js";

describe("criarCliente", () => {

    test("deve criar um cliente com os dados informados", () => {
        const resultado = criarCliente(
            1,
            "Maria",
            "47999999999"
        );

        expect(resultado).toEqual({
            id: 1,
            nome: "Maria",
            telefone: "47999999999",
            ativo: true
        });
    });

    test("deve criar o cliente como ativo", () => {
        const resultado = criarCliente(
            1,
            "Maria",
            "47999999999"
        );

        expect(resultado.ativo).toBe(true);
    });

});

describe("buscarClientePorId", () => {

    test("deve encontrar o cliente pelo ID", () => {
        const lista = [
            { id: 1, nome: "Maria" },
            { id: 2, nome: "Ana" }
        ];

        const resultado = buscarClientePorId(lista, 2);

        expect(resultado.nome).toBe("Ana");
    });

    test("deve retornar undefined quando o cliente não existir", () => {
        const lista = [
            { id: 1, nome: "Maria" }
        ];

        const resultado = buscarClientePorId(lista, 99);

        expect(resultado).toBeUndefined();
    });

});