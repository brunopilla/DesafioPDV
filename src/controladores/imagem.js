const { uploadFile, listarFiles } = require("../storage");

async function uploadImagem(req, res) {
    const { file } = req;
    if (!file) {
        return res.status(404).json({ mensagem: 'Por favor envie uma imagem' });
    }
    try {
        const hoje = new Date();
        const timestamp = hoje.getTime();
        const imageName = `${timestamp}-${file.originalname}`;
        const imagem = await uploadFile(
            `imagens/${imageName}`,
            file.buffer,
            file.mimetype
        );
        return res.status(201).json(imagem);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor ao fazer o upload da imagem' });
    }
}

async function listarImagens(req, res) {
    try {
        const imagens = await listarFiles()

        return res.json(imagens)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
}

module.exports = {
    uploadImagem,
    listarImagens
}