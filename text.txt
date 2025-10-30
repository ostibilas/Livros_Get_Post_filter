const { NOMEM } = require("dns/promises");
const express = require("express");
const app = express();
const PORT = 8081;
const fs = require("fs");


app.get("/produtos", (req, res) => {

    try {
        //lendo o arquivo Jzon
        const data = fs.readFileSync("./produtos.json","utf-8");
        // convertendo o aquivo json em objecto js
        let produtos = JSON.parse(data);
        let finalProdutos;
        //res.status(200).json(produtos);
        const {nomeProduto} = req.query;
        const {menorPreco} = req.query;
        const {maiorPreco} = req.query;

        if(nomeProduto){
        produtos = produtos.filter(produto=>produto.nome.toLowerCase().includes(nomeProduto.toLowerCase()));
        }

        if(menorPreco){
        Produtos = produtos.filter(produto=>produto.preco <= menorPreco);
        }
        else{
            if(maiorPreco){
            Produtos = produtos.filter(produto=>produto.preco >= maiorPreco);
            }
        }

        if(maiorPreco && menorPreco ){
        Produtos = produtos.filter(produto=>produto.preco >= maiorPreco && produto.preco <= menorPreco);
        }

        res.status(200).json(Produtos);
        
    } catch (error) {
        console.error("erro ao ler arquivo json:",error);
        res.status(500).json({erro: "Erro interno no servidor ao processar os produtos!"});
    }
})


app.listen(PORT, () => {
    console.log(`Serviddor rodando em http://localhost:${PORT}`);
})