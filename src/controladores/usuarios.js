const bcrypt = require("bcrypt")
const knex = require("../banco_dados/conexao")
const jwt = require("jsonwebtoken")

async function cadastrarUsuario(req, res) {
    const { nome, email, senha } = req.body
    const senhaCriptografada = await bcrypt.hash(senha, 10)
    const usuario = {
        nome,
        email,
        senha: senhaCriptografada
    }

    try {
        const jaExisteEmail = await knex('usuarios').where('email', email).first()
        if (jaExisteEmail) {
            return res.status(400).json({ message: "Já existe usuário cadastrado com o e-mail informado." })
        }

        await knex("usuarios").insert(usuario)
        return res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: "Erro interno do Servidor" })
    }
}

async function login(req, res) {
    const { email, senha } = req.body

    try {
        const usuario = await knex('usuarios').where('email', email).first()
        if (!usuario) {
            return res.status(404).json({ mensagem: "Usuário e/ou senha inválido(s)." })
        }
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha)
        if (!senhaCorreta) {
            return res.status(404).json({ mensagem: "Usuário e/ou senha inválido(s)." })
        }
        const token = jwt.sign({ id: usuario.id }, process.env.JWT_PASSWORD, { expiresIn: '8h' })
        const { senha: _, ...usuarioLogado } = usuario
        return res.status(200).json({ usuario: usuarioLogado, token })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Erro interno do Servidor" })
    }
}

async function detalharUsuario(req, res) {
    return res.status(200).json(req.usuario)
}

async function atualizarUsuario(req, res) {
    const { nome, email, senha } = req.body
    const senhaCriptografada = await bcrypt.hash(senha, 10)
    const usuario = {
        nome,
        email,
        senha: senhaCriptografada
    }

    try {
        const jaExisteEmail = await knex('usuarios').where('email', email).andWhere('id', '<>', req.usuario.id).first()
        if (jaExisteEmail) {
            return res.status(400).json({ message: "Já existe usuário cadastrado com o e-mail informado." })
        }

        await knex("usuarios").update(usuario).where('id', req.usuario.id)
        return res.status(201).json({ mensagem: "Usuário atualizado com sucesso!" })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: "Erro interno do Servidor" })
    }
}

module.exports = { cadastrarUsuario, login, detalharUsuario, atualizarUsuario }