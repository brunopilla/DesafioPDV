const joi = require('joi')

const schemaPedido = joi.object({
    cliente_id: joi.number().required().messages({
        'number.base': 'O campo cliente_id precisa ser do tipo numérico',
        'any.required': 'O campo cliente_id é obrigatório',
        'number.empty': 'O campo cliente_id é obrigatório'
    }),
    observacao: joi.string().messages({
        'string.base': 'O campo observacao precisa ser do tipo string',
    }),
    pedido_produtos: joi.array().items(joi.object({
        produto_id: joi.number().required().messages({
            'number.base': 'O campo produto_id precisa ser do tipo numérico',
            'any.required': 'O campo produto_id é obrigatório',
            'number.empty': 'O campo produto_id é obrigatório'
        }),
        quantidade_produto: joi.number().min(0.01).required().messages({
            'number.base': 'O campo quantidade_produto precisa ser do tipo numérico',
            'number.min': 'Informar a quantidade do produto',
            'any.required': 'O campo quantidade_produto é obrigatório',
            'number.empty': 'O campo quantidade_produto é obrigatório'
        })
    })).unique("produto_id").min(1).required().messages({
        'array.base': 'É necessário informar um array de produtos do pedido',
        'array.min': 'Informar ao menos um produto para o pedido',
        'any.required': 'O campo pedido_produtos é obrigatório',
        'array.empty': 'O campo pedido_produtos é obrigatório',
        'array.unique': 'Não é permitido dois produtos iguais no mesmo pedido'
    }),
})

module.exports = { schemaPedido }