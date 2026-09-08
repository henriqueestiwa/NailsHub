import { gerarMenorIdDisponivel } from "./ids.js";

export function criarServico(lista, nome, valor) {

    const novoServico = {
        id: gerarMenorIdDisponivel(lista),
        servico: nome,
        valor: valor,
        ativo: true,
        imagem: "foto1"
    };

    return novoServico;
}

export function buscarServicoPorId(lista, id) {
    return lista.find(servico => servico.id === Number(id));
}

export function listarServicosAtivos(lista) {
    return lista.filter(servico => servico.ativo === true);
}