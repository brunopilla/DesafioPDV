const knex = require("../banco_dados/conexao")

async function cadastrarCliente(req, res) {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body
    const cliente = {
        nome,
        email,
        cpf,
        cep,
        rua,
        numero,
        bairro,
        cidade,
        estado
    }

    try {
        const jaExisteEmail = await knex('clientes').where('email', email).first()
        if (jaExisteEmail) {
            return res.status(400).json({ mensagem: "Já existe cliente cadastrado com o e-mail informado." })
        }

        const jaExisteCpf = await knex('clientes').where('cpf', cpf).first()
        if (jaExisteCpf) {
            return res.status(400).json({ mensagem: "Já existe cliente cadastrado com o cpf informado." })
        }

        await knex("clientes").insert(cliente)
        return res.status(201).json({ mensagem: "Cliente cadastrado com sucesso!" })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: "Erro interno do Servidor" })
    }
}

async function atualizarCliente(req, res) {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body
    const { id } = req.params
    if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({ mensagem: "O parâmetro 'id' deve ser um número válido" });
    }
    const cliente = {
        nome,
        email,
        cpf,
        cep,
        rua,
        numero,
        bairro,
        cidade,
        estado
    }

    try {
        const jaExisteEmail = await knex('clientes').where('email', email).andWhere('id', '<>', id).first()
        if (jaExisteEmail) {
            return res.status(400).json({ mensagem: "Já existe cliente cadastrado com o e-mail informado." })
        }

        const jaExisteCpf = await knex('clientes').where('cpf', cpf).andWhere('id', '<>', id).first()
        if (jaExisteCpf) {
            return res.status(400).json({ mensagem: "Já existe cliente cadastrado com o cpf informado." })
        }

        await knex("clientes").update(cliente).where('id', id)
        return res.status(201).json({ mensagem: "Cliente atualizado com sucesso!" })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: "Erro interno do Servidor" })
    }
}

async function detalharCliente(req, res) {
    try {
        const { id } = req.params;

        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({ mensagem: "O parâmetro 'id' deve ser um número válido" });
        }

        const cliente = await knex('clientes').where('id', id).first();

        if (!cliente) {
            return res.status(404).json({ message: "Não existe cliente para o ID informado" });
        }

        return res.status(200).json(cliente);

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: "Erro interno do Servidor" })

    }
}

async function listarClientes(req, res) {
    try {
        const clientes = await knex('clientes')
        return res.status(200).json(clientes)
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: "Erro interno do Servidor" })
    }
}

module.exports = {
    cadastrarCliente,
    detalharCliente,
    atualizarCliente,
    listarClientes
}
