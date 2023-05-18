const joi = require('joi')

const schemaProduto = joi.object({
    descricao: joi.string().required().messages({
        'string.base': 'O campo descrição precisa ser do tipo string',
        'any.required': 'O campo descrição é obrigatório',
        'string.empty': 'O campo descrição é obrigatório'
    }),
    quantidade_estoque: joi.number().min(0.01).required().messages({
        'number.base': 'O campo quantidade precisa ser do tipo numérico',
        'number.min': 'Informar número maior que zero no campo quantidade_estoque',
        'any.required': 'O campo quantidade é obrigatório',
        'number.empty': 'O campo quantidade é obrigatório'
    }),
    valor: joi.number().min(1).required().messages({
        'number.base': 'O campo valor precisa ser do tipo numérico',
        'number.min': 'Informar número maior que zero no campo valor',
        'any.required': 'O campo valor é obrigatório',
        'number.empty': 'O campo valor é obrigatório'
    }),
    categoria_id: joi.number().required().messages({
        'number.base': 'O campo categoria_id precisa ser do tipo numérico',
        'any.required': 'O campo categoria_id é obrigatório',
        'number.empty': 'O campo categoria_id é obrigatório'
    }),
    produto_imagem: joi.string().messages({
        'string.base': 'O campo produto_imagem precisa ser uma URL do tipo string',
    })
})

module.exports = { schemaProduto }