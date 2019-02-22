const {
    obterPessoas
} = require('./service')

Array.prototype.meuReduce = function (callback, valorInicial){
    
}

async function main(){
    try {
        const {results} = await obterPessoas('a')

        const alturas = results.map(item => parseInt(item.height))

        console.log(`alturas`, alturas)
        const total = alturas.reduce((anterior, atual) =>{
            return anterior + atual
        })

        console.log(`total`, total)
    } catch (error) {
        console.error('DEU RUIM', error)
    }

}
main()