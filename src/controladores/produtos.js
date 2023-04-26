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

module.exports = { cadastrarProduto }