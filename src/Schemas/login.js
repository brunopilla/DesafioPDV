const joi = require('joi')

const schemaLogin = joi.object({
    email: joi.string().max(150).email().required().messages({
        'string.base': 'O campo e-mail precisa ser do tipo string',
        'string.max': 'Não exceder 150 caracteres para o campo email',
        'string.email': 'E-mail inválido',
        'any.required': 'O campo email é obrigatório',
        'string.empty': 'O campo email é obrigatório'
    }),
    senha: joi.string().required().messages({
        'string.base': 'O campo senha precisa ser do tipo string',
        'any.required': 'O campo senha é obrigatório',
        'string.empty': 'O campo senha é obrigatório'
    }),
})

module.exports = {
    schemaLogin
} 