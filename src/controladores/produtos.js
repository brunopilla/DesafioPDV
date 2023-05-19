const knex = require("../banco_dados/conexao")
const { excluirImagem } = require("../storage")
const { uploadImagem } = require("./imagem")

async function cadastrarProduto(req, res) {
    const { descricao, quantidade_estoque, valor, categoria_id, produto_imagem } = req.body

    const produto = {
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
        produto_imagem
    }

    try {
        const existeCategoria = await knex('categorias').where('id', categoria_id).first()
        if (!existeCategoria) {
            return res.status(400).json({ mensagem: "Categoria inválida!" })
        }

        await knex("produtos").insert(produto)
        return res.status(201).json({ mensagem: "Produto cadastrado com sucesso!" })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: "Erro interno do Servidor" })
    }
}

async function listarProduto(req, res) {
    const { categoria_id } = req.query;
    let produtos;
    try {
        if (categoria_id) {
            if (!Number.isInteger(Number(categoria_id))) {
                return res.status(400).json({ mensagem: "O parâmetro 'id_categoria' deve ser um número" })
            }
            const existeCategoria = await knex('categorias').where('id', categoria_id).first()
            if (!existeCategoria) {
                return res.status(400).json({ mensagem: "A categoria informada não está cadastrada" })
            }
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
    const { descricao, quantidade_estoque, valor, categoria_id, produto_imagem } = req.body
    const produto = {
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
        produto_imagem
    }
    if (!Number.isInteger(Number(id))) {
        return res.status(404).json({ mensagem: "O parâmetro 'id' deve ser um número válido" })
    }
    try {
        const existeProduto = await knex('produtos').where('id', id).first()
        if (!existeProduto) {
            return res.status(400).json({ mensagem: "Poduto não encontrado!" })
        }
        const existeCategoria = await knex('categorias').where('id', categoria_id).first()
        if (!existeCategoria) {
            return res.status(400).json({ message: "Categoria inválida!" })
        }
        if (existeProduto.produto_imagem && existeProduto.produto_imagem !== produto_imagem) {
            excluirImagem(existeProduto.produto_imagem)
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
        const existePedido = await knex('pedido_produtos').where('produto_id', id).first()
        if (existePedido) {
            return res.status(400).json({ "mensagem": "O produto informado não pode ser excluído pois encontra-se atrelado a um ou vários pedidos" })
        }
        if (existeProduto.produto_imagem) {
            await excluirImagem(existeProduto.produto_imagem)
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