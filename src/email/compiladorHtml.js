const fs = require("fs/promises")
const handlebars = require("handlebars")

async function compilarHtml(arquivoHtml, variaveis) {
    const htmlSimples = await fs.readFile(arquivoHtml)
    const compilador = handlebars.compile(htmlSimples.toString())
    const htmlCompilada = compilador(variaveis)
    return htmlCompilada
}

module.exports = compilarHtml