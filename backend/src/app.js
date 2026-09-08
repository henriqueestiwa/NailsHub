import express from "express";
import { validarNomeServico, validarValorServico, validarDuplicidade } from "./validacoes.js";
import { criarServico } from "./servicos.js";

const app = express();
app.use(express.json());

const servicos = [
    {
        id: 1,
        servico: "alongamento",
        valor: 150,
        ativo: true,
        imagem: "foto1"
    },
    {
        id: 2,
        servico: "manutenção",
        valor: 80,
        ativo: true,
        imagem: "foto1"
    }
]

const imagens = [
    {
        foto: 1
    },
    {
        foto: 2
    }
]

function buscaServ(id) {
    return servicos.findIndex(servicos => {
        return servicos.id === Number(id);
    })
}

app.get("/", (req, res) => {
    res.status(200).send("NailsHub app.js")
});

app.get("/servicos", (req, res) => {
    res.status(200).json(servicos);
});

app.get("/servicos/:id", (req, res) => {
    const index = buscaServ(req.params.id);
    res.status(200).json(servicos[index]);
})

app.post("/servicos", (req, res) => {

    const erroNome = validarNomeServico(req.body.servico);

    if (erroNome) {
        return res.status(400).send(erroNome);
    }

    const erroValor = validarValorServico(req.body.valor);

    if (erroValor) {
        return res.status(400).send(erroValor);
    }

    const servicoExiste = validarDuplicidade(servicos, req.body.servico);

    if (servicoExiste) {
        return res.status(409).send("Serviço duplicado, ação cancelada.");
    }

    const novoServico = criarServico(
    servicos,
    req.body.servico,
    req.body.valor
    );

    servicos.push(novoServico);

    return res.status(201).json(novoServico);
});

app.put("/servicos/:id", (req, res) => {
    const index = buscaServ(req.params.id);
    servicos[index].servico = req.body.servico;
    res.status(200).json(servicos);
})

app.get("/imagens", (req, res) => {
    res.status(200).json(imagens);
});

app.post("/imagens", (req, res) => {
    imagens.push(req.body);
    res.status(201).send("Imagem salva.");
});

export default app;
