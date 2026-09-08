function validarHorario(horario) {

    if (!horario) {
        throw new Error("Horário obrigatório.");
    }

    if (horario < "08:00") {
        throw new Error("Horário fora do expediente.");
    }
}

export function criarAgendamento( id, clienteId, servico, data, horario){

    if (!clienteId) {
        throw new Error("Cliente obrigatório.");
    }

    if (!servico) {
        throw new Error("Serviço obrigatório.");
    }

    if (!servico.ativo) {
        throw new Error("Não é possível agendar um serviço inativo.");
    }

    if (!data) {
        throw new Error("Data obrigatória.");
    }

    validarHorario(horario);

    return {
        id,
        clienteId,
        servicoId: servico.id,
        data,
        horario,
        status: "agendado"
    };
}

export function notificarAgendamento(agendamento, enviarMensagem){
    if (!agendamento) {
        throw new Error("Agendamento obrigatório.");
    }

    const mensagem =
        `Agendamento confirmado para ${agendamento.data} às ${agendamento.horario}.`;

    enviarMensagem(mensagem);

    return mensagem;
}