const {obterPessoas} = require('./service')

Array.prototype.meuFilter  = function(callback){
    const lista = []
    for(item of this){
        const result = callback(item, this)

        if(!result){
            continue
        }
        lista.push(item)
    }
    return lista
}


async function main(){
    try {
        const {
            results
        } = await obterPessoas('a')

        // const familiaLars = results.filter(function (item){
        //     const result = item.name.toLowerCase().indexOf(`lars`) !== -1
        //     return result
        // })
        const familiaLars = results.meuFilter((item, lista) => {
            const result = item.name.toLowerCase().indexOf(`lars`) !== -1
            return result
            }
        )

        const names = familiaLars.map(pessoa => pessoa.name)
        
        console.log(names)
    } catch (error) {
        console.error('DEU RUIM', error)
    }
}

main()