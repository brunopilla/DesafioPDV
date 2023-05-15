const knex = require("../banco_dados/conexao")
const compilarHtml = require("../email/compiladorHtml")
const transporter = require("../email/email")

async function cadastrarPedido(req, res) {
    const { cliente_id, observacao, pedido_produtos } = req.body

    try {
        const cliente = await knex('clientes').where('id', cliente_id).first()
        if (!cliente) {
            return res.status(400).json({ mensagem: "Cliente não encontrado!" })
        }
        let valor_total = 0
        let produtos = []
        for (let item of pedido_produtos) {
            const produto = await knex('produtos').where('id', item.produto_id).first()
            let estoqueFinal = 0
            if (!produto) {
                return res.status(400).json({ mensagem: `Produto id ${item.produto_id} não encontrado!` })
            }
            if (Number(produto.quantidade_estoque) < Number(item.quantidade_produto)) {
                return res.status(400).json({
                    mensagem: `Quantidade em estoque (${produto.quantidade_estoque}) insuficiente para o produto id ${item.produto_id}!`
                })
            }
            valor_total += Number(produto.valor) * Number(item.quantidade_produto)
            item.valor_produto = produto.valor
            estoqueFinal = Number(produto.quantidade_estoque) - Number(item.quantidade_produto)
            produtos.push({
                id: produto.id,
                quantidade_estoque: estoqueFinal
            })
        }
        const pedido = {
            cliente_id,
            observacao,
            valor_total
        }

        const pedido_id = await knex("pedidos").insert(pedido).returning("id")
        for (let item of pedido_produtos) {
            await knex("pedido_produtos").insert({
                pedido_id: pedido_id[0].id,
                produto_id: item.produto_id,
                quantidade_produto: item.quantidade_produto,
                valor_produto: item.valor_produto
            })
        }

        for (let produto of produtos) {
            await knex("produtos").update({
                quantidade_estoque: produto.quantidade_estoque,
            }).where("id", produto.id)
        }

        const html = await compilarHtml("./src/email/template.html", {
            cliente: cliente.nome,
            idPedido: pedido_id[0].id,
            valor: (valor_total / 100).toFixed(2)
        })

        transporter.sendMail({
            from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
            to: `${cliente.nome} <${cliente.email}>`,
            subject: `Pedido ${pedido_id[0].id} Realizado`,
            html
        }).promisse()

        return res.status(201).json({ mensagem: "Pedido cadastrado com sucesso!" })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: "Erro interno do Servidor" })
    }
}

module.exports = {
    cadastrarPedido
}