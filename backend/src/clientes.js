export function criarCliente(id, nome, telefone) {
    return {
        id,
        nome,
        telefone,
        ativo: true
    };
}

export function buscarClientePorId(lista, id) {
    return lista.find(cliente => cliente.id === Number(id));
}