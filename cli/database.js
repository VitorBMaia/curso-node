const {
    readFile,
    writeFile
} = require('fs')

const {
    promisify
} = require('util')


const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)
// const arquivoJson = require('./herois.json')

class Database{
    
    constructor (){
        this.NOME_ARQUIVO = 'herois.json' 
    }

    async obterDadosArquivo(){
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8')
        return JSON.parse(arquivo.toString())
    }

    async escrerArquivo(dados){
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))
        return true;
    }

    async listar(id){
        const dados = await this.obterDadosArquivo()
        const dadosFiltrados = dados.filter( item => (id ? (item.id === id) : true))
        return dadosFiltrados
    }

    async cadastrar(heroi){
        
        let novoHeroi = {
            ...heroi
        }
        
        if(!(parseInt(heroi.id)<=2)){
            const id = Date.now()
            novoHeroi = {
                ...heroi,
                id
            }
        }
        
        const dados = await this.obterDadosArquivo()
        const novoArquivo = [
            ...dados,
            novoHeroi
        ]

        const resultado = await this.escrerArquivo(novoArquivo)
        return resultado

    }

    async deletar(id){
        if(!id){
            this.escrerArquivo([])
            return true;
        }

        let dados = await this.listar();
        const quantidadeOriginal  = dados.length
        let posicao = 0;
        for (const iterator of dados) {
            if(iterator.id === parseInt(id)){
                dados.splice(posicao, 1)
            } else{
                posicao++;
            }   
        }
        
        if(quantidadeOriginal  === dados.length){
            
            throw Error("O id informado não existe")
        }
        const resultado = await this.escrerArquivo(dados)
        return resultado;

    }

    async update(id, alteracoes){
        const dados = await this.obterDadosArquivo()
        
        const item = dados.find(item =>  parseInt(item.id) === parseInt(id))
        //const indice = dados.indexOf(item)
        if(!item){
            throw Error('Item não encontrado')
        }
        const heroiAtual = item
        const heroiAtualizado = {
            ...heroiAtual,
            ...alteracoes
        }
        dados.splice(dados.indexOf(item), 1)
        
        const dadosAtualizados = [
            ...dados,
            heroiAtualizado
        ]
        await this.escrerArquivo(dadosAtualizados)
        return true;
    }
}

module.exports = new Database()