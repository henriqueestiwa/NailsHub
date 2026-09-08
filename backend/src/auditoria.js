export function criarRegistroAuditoria( acao, dados, obterDataHora){
    if (!acao) {
        throw new Error("Ação obrigatória.");
    }

    if (!dados) {
        throw new Error("Dados obrigatórios.");
    }

    return {
        acao,
        dados,
        dataHora: obterDataHora()
    };
}

export function registrarAuditoria( lista, acao, dados, obterDataHora){
    const registro = criarRegistroAuditoria( acao, dados, obterDataHora);

    lista.push(registro);

    return registro;
}