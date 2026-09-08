export function validarNomeServico(nome) {

    if (!nome) {
        return "Nome do serviço obrigatório, ação cancelada.";
    }

    if (typeof nome !== "string") {
        return "Nome do serviço inválido, favor utilizar apenas texto.";
    }

    if (nome.length < 3 || nome.length > 50) {
        return "O nome do serviço deve possuir entre 3 e 50 caracteres.";
    }

    if (nome.trim() !== nome) {
        return "O nome do serviço não pode começar ou terminar com espaços.";
    }

    if (!/^[\p{L} ]+$/u.test(nome)) {
        return "O nome do serviço deve conter apenas letras e espaços.";
    }

    return null;
}

export function validarValorServico(valor) {

    if (valor === undefined) {
        return "Valor não definido, favor informar o preço do serviço.";
    }

    if (typeof valor !== "number") {
        return "Valor inválido, favor utilizar apenas números.";
    }

    const partesValor = valor.toString().split(".");

    if (partesValor[1] && partesValor[1].length > 2) {
        return "Valor inválido, utilize no máximo duas casas decimais.";
    }

    if (valor <= 0) {
        return "Valor inválido, necessita ser maior que 0.";
    }

    if (valor > 1000) {
        return "Valor muito grande, verificar novamente.";
    }

    return null;
}

export function validarDuplicidade(lista, nome) {

    return lista.some(item => item.servico.toLowerCase() === nome.toLowerCase());
}