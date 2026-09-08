import { validarNomeServico, validarValorServico, validarDuplicidade } from "../src/validacoes.js";


describe("validarNomeServico", () => {

    test("deve aceitar um nome de serviço válido", () => {
        const resultado = validarNomeServico("Alongamento");

        expect(resultado).toBeNull();
    });

    test("deve rejeitar nome vazio", () => {
        const resultado = validarNomeServico("");

        expect(resultado).toBe(
            "Nome do serviço obrigatório, ação cancelada."
        );
    });

    test("deve rejeitar nome com menos de 3 caracteres", () => {
        const resultado = validarNomeServico("Ab");

        expect(resultado).toBe(
            "O nome do serviço deve possuir entre 3 e 50 caracteres."
        );
    });

    test("deve aceitar nome com exatamente 3 caracteres", () => {
        const resultado = validarNomeServico("Gel");

        expect(resultado).toBeNull();
    });

    test("deve rejeitar nome com espaço no início", () => {
        const resultado = validarNomeServico(" Alongamento");

        expect(resultado).toBe(
            "O nome do serviço não pode começar ou terminar com espaços."
        );
    });

    test("deve rejeitar nome contendo números", () => {
        const resultado = validarNomeServico("Gel2");

        expect(resultado).toBe(
            "O nome do serviço deve conter apenas letras e espaços."
        );
    });

    test("deve aceitar letras acentuadas", () => {
        const resultado = validarNomeServico("Manutenção");

        expect(resultado).toBeNull();
    });

});

describe("validarValorServico", () => {

    test("deve aceitar um valor válido", () => {
        const resultado = validarValorServico(80);

        expect(resultado).toBeNull();
    });

    test("deve rejeitar valor zero", () => {
        const resultado = validarValorServico(0);

        expect(resultado).toBe(
            "Valor inválido, necessita ser maior que 0."
        );
    });

    test("deve aceitar o menor valor permitido de 0.01", () => {
        const resultado = validarValorServico(0.01);

        expect(resultado).toBeNull();
    });

    test("deve aceitar o valor máximo de 1000", () => {
        const resultado = validarValorServico(1000);

        expect(resultado).toBeNull();
    });

    test("deve rejeitar valor acima do máximo", () => {
        const resultado = validarValorServico(1000.01);

        expect(resultado).toBe(
            "Valor muito grande, verificar novamente."
        );
    });

    test("deve rejeitar valor com mais de duas casas decimais", () => {
        const resultado = validarValorServico(79.999);

        expect(resultado).toBe(
            "Valor inválido, utilize no máximo duas casas decimais."
        );
    });

    test("deve rejeitar valor negativo", () => {
        const resultado = validarValorServico(-10);

        expect(resultado).toBe(
            "Valor inválido, necessita ser maior que 0."
        );
    });

    test("deve rejeitar valor informado como texto", () => {
        const resultado = validarValorServico("80");

        expect(resultado).toBe(
            "Valor inválido, favor utilizar apenas números."
        );
    });

    test("deve rejeitar valor não informado", () => {
        const resultado = validarValorServico(undefined);

        expect(resultado).toBe(
            "Valor não definido, favor informar o preço do serviço."
        );
    });

});

describe("validarDuplicidade", () => {

    test("deve identificar serviço duplicado com o mesmo nome", () => {
        const lista = [
            { id: 1, servico: "Alongamento" },
            { id: 2, servico: "Manutenção" }
        ];

        const resultado = validarDuplicidade(lista, "Alongamento");

        expect(resultado).toBe(true);
    });

    test("deve identificar duplicidade ignorando letras maiúsculas e minúsculas", () => {
        const lista = [
            { id: 1, servico: "Alongamento" }
        ];

        const resultado = validarDuplicidade(lista, "alongamento");

        expect(resultado).toBe(true);
    });

    test("deve retornar falso quando o serviço não existir", () => {
        const lista = [
            { id: 1, servico: "Alongamento" },
            { id: 2, servico: "Manutenção" }
        ];

        const resultado = validarDuplicidade(lista, "Remoção");

        expect(resultado).toBe(false);
    });

    test("deve retornar falso quando a lista estiver vazia", () => {
        const lista = [];

        const resultado = validarDuplicidade(lista, "Alongamento");

        expect(resultado).toBe(false);
    });

});