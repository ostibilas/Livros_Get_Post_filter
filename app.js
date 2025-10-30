const express = require("express")
const app = express();
const PORT = 8081;
const pathFile = "./livros.json";
const fs = require("fs");

app.use(express.json()); //liberando o middleware, falando pro servidor pq pode aceitar json

app.get("/ConsultaLivro", (req, res) => {
    try {
        const data = fs.readFileSync(pathFile, "utf-8");
        const livros = SON.parse(data);
        
        res.status(201).json(livros);

    } catch (error) {
        console.log("Erro ao consultar livro", error)
        res.status(500).json({ erro: "Erro interno servidor do livro" });
    }
})

app.post("/cadastrar", (req, res) => {
    try {
        const { titulo, autor, anoPubli, quantidadeEstoque } = req.body;
        if (!fs.readFileSync(pathFile, "utf-8")) {
            fs.writeFileSync(pathFile, `[]`);
        }
        const data = fs.readFileSync(pathFile, "utf-8");
        const livros = JSON.parse(data);
        const livro = {
            titulo: titulo,
            autor: autor,
            anoPubli: anoPubli,
            quantidadeEstoque: quantidadeEstoque
        }

        livros.push(livro);
        fs.writeFileSync(pathFile, JSON.stringify(livros, null, 4));
        //console.log(`Produto Cadastrado com sucesso! livro: ${livro}`)

        res.status(201).json({
            mensage: "Livro Cadastrado com Sucesso",
            livros: livros
        })

    } catch (error) {
        console.log("Erro ao cadastrar livro", error)
        res.status(500).json({ erro: "Erro interno servidor do livro" });
    }
})

app.listen(PORT, () => {
    console.log(`Servidor Rodandando em ${PORT}`);
})