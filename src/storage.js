const aws = require('aws-sdk');
require('aws-sdk/lib/maintenance_mode_message').suppress = true;
require('dotenv').config();

const endpoint = new aws.Endpoint(process.env.ENDPOINT_S3)

const s3 = new aws.S3({
    endpoint,
    credentials: {
        accessKeyId: process.env.KEY_ID,
        secretAccessKey: process.env.APP_KEY
    }
})

const uploadFile = async (path, buffer, mimetype) => {
    const imagem = await s3.upload({
        Bucket: process.env.KEY_NAME,
        Key: path,
        Body: buffer,
        ContentType: mimetype
    }).promise()

    return { url: imagem.Location }
}

const listarFiles = async () => {
    const imagens = await s3.listObjects({
        Bucket: process.env.KEY_NAME
    }).promise()

    const files = imagens.Contents.map((file) => {
        return {
            url: `https://${process.env.ENDPOINT_S3}/${process.env.KEY_NAME}/${file.Key}`,
            path: file.Key
        }
    })

    return files
}

const excluirImagem = async (path) => {
    await s3.deleteObject({
        Bucket: process.env.KEY_NAME,
        Key: path
    }).promise()
}

module.exports = {
    uploadFile,
    listarFiles,
    excluirImagem
}