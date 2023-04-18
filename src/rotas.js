const { Router } = require("express")
const { listarCategorias } = require("./controladores/categorias")
const { cadastrarUsuario, login, detalharUsuario, atualizarUsuario } = require("./controladores/usuarios")
const { schemaUsuario } = require("./Schemas/usuarios")
const { validarCorpoRequisicao } = require("./intermediarios/validarCorpoRequisicao")
const { verificarUsuarioLogado } = require("./intermediarios/autenticador")
const rotas = Router()

rotas.get("/categoria", listarCategorias)
rotas.post("/usuario", validarCorpoRequisicao(schemaUsuario), cadastrarUsuario)
rotas.post("/login", login)
rotas.use(verificarUsuarioLogado)
rotas.get("/usuario", detalharUsuario)
rotas.put("/usuario", validarCorpoRequisicao(schemaUsuario), atualizarUsuario)

module.exports = rotas