const knex = require("../banco_dados/conexao")

async function cadastrarProduto(req, res) {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body

    const produto = {
        descricao,
        quantidade_estoque,
        valor,
        categoria_id
    }

    try {
        const existeCategoria = await knex('categorias').where('id', categoria_id).first()
        if (!existeCategoria) {
            return res.status(400).json({ message: "Categoria inválida!" })
        }

        await knex("produtos").insert(produto)
        return res.status(201).json({ mensagem: "Produto cadastrado com sucesso!" })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: "Erro interno do Servidor" })
    }
}

async function listarProduto(req, res) {
    try {
        const { categoria_id } = req.query;
        let produtos;

        if (categoria_id) {
            produtos = await knex('produtos').where('categoria_id', categoria_id);
        } else {
            produtos = await knex('produtos');
        }

        return res.status(200).json(produtos);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ "Mensagem": "Erro interno do Servidor" });
    }
}

async function detalharProduto(req, res) {
    const id = req.params.id
    if (!Number.isInteger(Number(id))) {
        return res.status(404).json({ mensagem: "O parâmetro 'id' deve ser um número válido" })
    }
    try {
        const produto = await knex("produtos").where("id", id).first()
        if (!produto) {
            return res.status(404).json({ "mensagem": "O produto informado não existe" })
        }
        return res.status(200).json(produto)
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ "Mensagem": "Erro interno do Servidor" });
    }
}

async function atualizarProduto(req, res) {
    const { id } = req.params
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body
    const produto = {
        descricao,
        quantidade_estoque,
        valor,
        categoria_id
    }
    if (!Number.isInteger(Number(id))) {
        return res.status(404).json({ mensagem: "O parâmetro 'id' deve ser um número válido" })
    }
    try {
        const existeProduto = await knex('produtos').where('id', id).first()
        if (!existeProduto) {
            return res.status(400).json({ mensagem: "O parâmetro 'id' deve ser um número válido" })
        }
        const existeCategoria = await knex('categorias').where('id', categoria_id).first()
        if (!existeCategoria) {
            return res.status(400).json({ message: "Categoria inválida!" })
        }

        await knex("produtos").update(produto).where("id", id)
        return res.status(201).json({ mensagem: "Produto atualizado com sucesso!" })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: "Erro interno do Servidor" })
    }
}

async function excluirProduto(req, res) {
    const { id } = req.params
    if (!Number.isInteger(Number(id))) {
        return res.status(404).json({ mensagem: "O parâmetro 'id' deve ser um número válido" })
    }
    try {
        const existeProduto = await knex('produtos').where('id', id).first()
        if (!existeProduto) {
            return res.status(400).json({ "mensagem": "O produto informado não existe" })
        }
        await knex('produtos').where('id', id).del()
        return res.status(200).json({ "mensagem": "Produto excluido com sucesso!" })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: "Erro interno do Servidor" })
    }
}

module.exports = {
    cadastrarProduto,
    listarProduto,
    detalharProduto,
    atualizarProduto,
    excluirProduto
}