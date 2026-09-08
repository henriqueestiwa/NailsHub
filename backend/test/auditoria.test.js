import { jest } from "@jest/globals";
import { criarRegistroAuditoria, registrarAuditoria } from "../src/auditoria.js";

describe("auditoria", () => {

    let lista;
    let obterDataHora;

    beforeEach(() => {
        lista = [];

        obterDataHora = jest.fn(() => {
            return "2026-09-08 15:00";
        });
    });

    test("deve criar registro utilizando a data e hora fornecida", () => {

        const resultado = criarRegistroAuditoria(
            "EXCLUIR_SERVICO",
            { id: 1, servico: "Alongamento" },
            obterDataHora
        );

        expect(resultado).toEqual({
            acao: "EXCLUIR_SERVICO",
            dados: {
                id: 1,
                servico: "Alongamento"
            },
            dataHora: "2026-09-08 15:00"
        });
    });

    test("deve chamar a função responsável por obter data e hora uma vez", () => {

        criarRegistroAuditoria(
            "EXCLUIR_SERVICO",
            { id: 1 },
            obterDataHora
        );

        expect(obterDataHora).toHaveBeenCalledTimes(1);
    });

    test("deve adicionar o registro na lista de auditoria", () => {

        registrarAuditoria(
            lista,
            "EXCLUIR_SERVICO",
            { id: 1 },
            obterDataHora
        );

        expect(lista).toHaveLength(1);

        expect(lista[0].acao).toBe("EXCLUIR_SERVICO");
    });

    test("deve lançar exceção quando a ação não for informada", () => {

        expect(() => {
            criarRegistroAuditoria(
                undefined,
                { id: 1 },
                obterDataHora
            );
        }).toThrow("Ação obrigatória.");
    });

    test("deve lançar exceção quando os dados não forem informados", () => {

        expect(() => {
            criarRegistroAuditoria(
                "EXCLUIR_SERVICO",
                undefined,
                obterDataHora
            );
        }).toThrow("Dados obrigatórios.");
    });

});