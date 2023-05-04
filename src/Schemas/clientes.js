const joi = require('joi')

const schemaCliente = joi.object({
    nome: joi.string().max(100).required().messages({
        'string.base': 'O campo nome precisa ser do tipo string',
        'string.max': 'Não exceder 100 caracteres para o campo nome',
        'any.required': 'O campo nome é obrigatório',
        'string.empty': 'O campo nome é obrigatório'
    }),
    email: joi.string().max(100).email().required().messages({
        'string.base': 'O campo e-mail precisa ser do tipo string',
        'string.max': 'Não exceder 100 caracteres para o campo email',
        'string.email': 'E-mail inválido',
        'any.required': 'O campo email é obrigatório',
        'string.empty': 'O campo email é obrigatório'
    }),
    cpf: joi.string().max(11).required().messages({
        'string.base': 'O campo cpf precisa ser do tipo string',
        'string.max': 'Não exceder 11 caracteres para o campo CPF',
        'any.required': 'O campo cpf é obrigatório',
        'string.empty': 'O campo cpf é obrigatório'
    }),
    cep: joi.string().max(8).messages({
        'string.base': 'O campo CEP precisa ser do tipo string',
        'string.max': 'Não exceder 8 caracteres para o campo CEP',
    }),
    rua: joi.string().max(100).messages({
        'string.base': 'O campo rua precisa ser do tipo string',
        'string.max': 'Não exceder 100 caracteres para o campo rua',
    }),
    numero: joi.string().max(10).messages({
        'string.base': 'O campo número precisa ser do tipo string',
        'string.max': 'Não exceder 10 caracteres para o campo número',
    }),
    bairro: joi.string().max(100).messages({
        'string.base': 'O campo bairro precisa ser do tipo string',
        'string.max': 'Não exceder 100 caracteres para o campo bairro',
    }),
    cidade: joi.string().max(100).messages({
        'string.base': 'O campo cidade precisa ser do tipo string',
        'string.max': 'Não exceder 100 caracteres para o campo cidade',
    }),
    estado: joi.string().max(2).messages({
        'string.base': 'O campo estado precisa ser do tipo string',
        'string.max': 'Não exceder 2 caracteres para o campo estado',
    })
})

module.exports = {
    schemaCliente
}