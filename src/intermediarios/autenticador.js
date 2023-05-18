const jwt = require('jsonwebtoken')
const knex = require('../banco_dados/conexao')


async function verificarUsuarioLogado(req, res, next) {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ mensagem: "É necessário informar um token válido para acessar este recurso." })
    }
    const token = authorization.split(' ')[1]
    try {
        const { id } = jwt.verify(token, process.env.SENHA_JWT)
        const usuario = await knex('usuarios').where('id', id).first()
        if (!usuario) {
            return res.status(401).json({ mensagem: "É necessário informar um token válido para acessar este recurso." })
        }
        const { senha, ...usuarioLogado } = usuario
        req.usuario = usuarioLogado
        next()
    } catch (error) {
        console.log(error.message);
        return res.status(401).json({ mensagem: "É necessário informar um token válido para acessar este recurso." })
    }
}

module.exports = { verificarUsuarioLogado }