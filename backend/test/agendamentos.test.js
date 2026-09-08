import { jest } from "@jest/globals";
import { criarAgendamento, notificarAgendamento } from "../src/agendamentos.js";

describe("criarAgendamento - TDD", () => {

    test("deve criar um agendamento quando os dados forem válidos", () => {
        const servico = {
            id: 1,
            servico: "Alongamento",
            ativo: true
        };

        const resultado = criarAgendamento(
            1,
            10,
            servico,
            "2026-09-15",
            "14:00"
        );

        expect(resultado).toEqual({
            id: 1,
            clienteId: 10,
            servicoId: 1,
            data: "2026-09-15",
            horario: "14:00",
            status: "agendado"
        });
    });

    test("deve rejeitar agendamento quando o serviço estiver inativo", () => {
        const servico = {
            id: 1,
            servico: "Alongamento",
            ativo: false
        };

        expect(() => {
            criarAgendamento(
                1,
                10,
                servico,
                "2026-09-15",
                "14:00"
            );
        }).toThrow("Não é possível agendar um serviço inativo.");
    });

    test("deve rejeitar agendamento sem cliente", () => {
        const servico = {
            id: 1,
            ativo: true
        };

        expect(() => {
            criarAgendamento(
                1,
                undefined,
                servico,
                "2026-09-15",
                "14:00"
            );
        }).toThrow("Cliente obrigatório.");
    });

    test("deve rejeitar agendamento sem serviço", () => {
        expect(() => {
            criarAgendamento(
                1,
                10,
                undefined,
                "2026-09-15",
                "14:00"
            );
        }).toThrow("Serviço obrigatório.");
    });

    test("deve rejeitar agendamento sem data", () => {
        const servico = {
            id: 1,
            ativo: true
        };

        expect(() => {
            criarAgendamento(
                1,
                10,
                servico,
                undefined,
                "14:00"
            );
        }).toThrow("Data obrigatória.");
    });

    test("deve rejeitar agendamento sem horário", () => {
        const servico = {
            id: 1,
            ativo: true
        };

        expect(() => {
            criarAgendamento(
                1,
                10,
                servico,
                "2026-09-15",
                undefined
            );
        }).toThrow("Horário obrigatório.");
    });

    test("deve aceitar horário no início do expediente", () => {
        const servico = {
            id: 1,
            ativo: true
        };

        const resultado = criarAgendamento(
            1,
            10,
            servico,
            "2026-09-15",
            "08:00"
        );

        expect(resultado.horario).toBe("08:00");
    });

    test("deve rejeitar horário anterior ao início do expediente", () => {
        const servico = {
            id: 1,
            ativo: true
        };

        expect(() => {
            criarAgendamento(
                1,
                10,
                servico,
                "2026-09-15",
                "07:59"
            );
        }).toThrow("Horário fora do expediente.");
    });

});

describe("notificarAgendamento", () => {

    test("deve enviar mensagem de confirmação", () => {

        const enviarMensagem = jest.fn();

        const agendamento = {
            data: "2026-09-15",
            horario: "14:00"
        };

        notificarAgendamento(
            agendamento,
            enviarMensagem
        );

        expect(enviarMensagem).toHaveBeenCalledTimes(1);
    });

    test("deve enviar a mensagem com data e horário do agendamento", () => {

        const enviarMensagem = jest.fn();

        const agendamento = {
            data: "2026-09-15",
            horario: "14:00"
        };

        notificarAgendamento(
            agendamento,
            enviarMensagem
        );

        expect(enviarMensagem).toHaveBeenCalledWith(
            "Agendamento confirmado para 2026-09-15 às 14:00."
        );
    });

    test("deve lançar exceção quando o agendamento não for informado", () => {

        const enviarMensagem = jest.fn();

        expect(() => {
            notificarAgendamento(
                undefined,
                enviarMensagem
            );
        }).toThrow("Agendamento obrigatório.");
    });

});