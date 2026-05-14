import express from "express";
import estudantes from "./dados.js";

const app = express();

const port = 3000;

let proximoId = 1;

app.use(express.json());

// Rota inicial
app.get("/", (req, res) => {
    res.status(200).send({ message: "Servidor funcionando!" });
});

// Criar estudante
app.post("/estudantes/criar", (req, res) => {

    const { nome, matricula, curso, ano } = req.body;

    // Validação
    if (!nome || !matricula || !curso || !ano) {
        return res.status(400).send({
            message: "É obrigatório preencher todos os dados."
        });
    }

    // Gerar ID automático
    if (estudantes.length > 0) {
        proximoId = estudantes[estudantes.length - 1].id + 1;
    }

    // Criar estudante
    const novoEstudante = {
        id: proximoId,
        nome,
        matricula,
        curso,
        ano
    };

    estudantes.push(novoEstudante);

    // Resposta
    res.status(201).send({
        message: "Estudante criado com sucesso!",
        estudante: novoEstudante
    });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});