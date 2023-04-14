const { Router } = require("express")
const { listarCategorias } = require("./controladores/categorias")
const { cadastrarUsuario, login } = require("./controladores/usuarios")
const { schemaUsuario } = require("./Schemas/usuarios")
const { validarCorpoRequisicao } = require("./intermediarios/validarCorpoRequisicao")
const rotas = Router()

rotas.get("/categoria", listarCategorias)
rotas.post("/usuario", validarCorpoRequisicao(schemaUsuario), cadastrarUsuario)
rotas.post("/login", login)

module.exports = rotas