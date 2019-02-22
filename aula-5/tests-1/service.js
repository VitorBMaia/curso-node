const {
    get
} = require('axios')

const URL = `https://swapi.co/api/people`

async function obterPessoas(nome){
    const url = `${URL}/?search=${nome}&format=json`
    const result = await get(url)
    return result.data.results.map(mapearPessoas)
}

function mapearPessoas(pessoas){
    const formatado = {
        nome: pessoas.name,
        altura: pessoas.height
    }
    return formatado
}

module.exports = {
    obterPessoas
}