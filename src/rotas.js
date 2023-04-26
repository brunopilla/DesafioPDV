const { Router } = require("express")
const { listarCategorias } = require("./controladores/categorias")
const { cadastrarUsuario, login, detalharUsuario, atualizarUsuario } = require("./controladores/usuarios")
const { schemaUsuario } = require("./Schemas/usuarios")
const { validarCorpoRequisicao } = require("./intermediarios/validarCorpoRequisicao")
const { verificarUsuarioLogado } = require("./intermediarios/autenticador")
const { cadastrarProduto } = require("./controladores/produtos")
const { schemaProduto } = require("./Schemas/produtos")
const rotas = Router()

rotas.get("/categoria", listarCategorias)
rotas.post("/usuario", validarCorpoRequisicao(schemaUsuario), cadastrarUsuario)
rotas.post("/login", login)
rotas.use(verificarUsuarioLogado)
rotas.get("/usuario", detalharUsuario)
rotas.put("/usuario", validarCorpoRequisicao(schemaUsuario), atualizarUsuario)
rotas.post("/produto", validarCorpoRequisicao(schemaProduto), cadastrarProduto)

module.exports = rotas