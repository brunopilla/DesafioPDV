const joi = require('joi')

const schemaUsuario = joi.object({
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
    senha: joi.string().max(150).required().messages({
        'string.base': 'O campo senha precisa ser do tipo string',
        'string.max': 'Não exceder 150 caracteres para o campo senha',
        'any.required': 'O campo senha é obrigatório',
        'string.empty': 'O campo senha é obrigatório'
    })
})

module.exports = { schemaUsuario }