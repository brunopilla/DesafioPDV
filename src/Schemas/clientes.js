const joi = require('joi')

const schemaCliente = joi.object({
    nome: joi.string().max(150).required().messages({
        'string.base': 'O campo nome precisa ser do tipo alfabético',
        'string.max': 'Não exceder 150 caracteres para o campo nome',
        'any.required': 'O campo nome é obrigatório',
        'string.empty': 'O campo nome é obrigatório'
    }),
    email: joi.string().max(150).email().required().messages({
        'string.base': 'O campo e-mail precisa ser do tipo alfabético',
        'string.max': 'Não exceder 150 caracteres para o campo email',
        'string.email': 'E-mail inválido',
        'any.required': 'O campo email é obrigatório',
        'string.empty': 'O campo email é obrigatório'
    }),
    cpf: joi.string().required().messages({
        'string.base': 'O campo cpf precisa ser do tipo alfanumérico',
        'any.required': 'O campo cpf é obrigatório',
        'string.empty': 'O campo cpf é obrigatório'
    })
})

module.exports = {
    schemaCliente
}