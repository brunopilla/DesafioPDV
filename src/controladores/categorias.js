const knex = require("../banco_dados/conexao")

async function listarCategorias(req, res) {
    try {
        const categorias = await knex('categorias')
        if (!categorias) {
            return res.status(404).json({ "Mensagem": "Não foi encontrado nenhuma categoria!" })
        }
        return res.status(200).json(categorias)
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ "Mensagem": "Erro interno do Servidor" })
    }
}

module.exports = { listarCategorias }