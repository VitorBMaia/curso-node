const{
    deepEqual,
    notDeepEqual
} = require('assert')

const database = require('./database.js')

const DEFAULT_ITEM = {

    nome: 'Flash',
    poder: 'speed',
    id: 1
}

const DEFAULT_ITEM_2 = 
{
    'nome':'Batman',
    'poder':'Dinheiro',
    id: 2
}

const NOVO_ITEM = {
    nome: 'Homem-Aranha',
    poder: 'escalar',
    id: 2

}
const ALTERACOES = {
    poder: 'viajar no tempo'
}

 
describe('Suite de manipulação de heróis', async ()=>{
    before(async () =>{
         await database.escrerArquivo([])
         await database.cadastrar(DEFAULT_ITEM)
         await database.cadastrar(DEFAULT_ITEM_2)
    })


    it('Deve listar um herói', async () =>{
        const expected = DEFAULT_ITEM
        const [actual] = await database.listar(DEFAULT_ITEM.id)

        deepEqual(actual, expected)
    })

    it('Deve listar todos os heróis', async () =>{
        const expected = DEFAULT_ITEM
        const [actual] = await database.listar()

        deepEqual(actual, expected)

    })

    
    
    it('Deveria cadastrar um herói', async () =>{
        const expected = NOVO_ITEM.nome
        await database.cadastrar(NOVO_ITEM)        
        const actual = await database.listar()
        
        deepEqual(actual[2].nome, expected)
    })

    it('Deveria deletar um registro de herói', async () =>{
        const dados = await database.listar()
        const expected = dados.length - 1;

        await database.deletar(2)
        
        const dadosAtualizados = await database.listar()
        const actual = dadosAtualizados.length

        deepEqual(actual, expected)
    })

    it('Deveria atualizar um registro de herói', async () =>{
        const objetoEsperado = {
            id: 1,
            nome: 'Flash',
            poder: 'viajar no tempo',
            
        }
        await database.update(DEFAULT_ITEM.id, ALTERACOES)        

        const dados = await database.obterDadosArquivo()
        const actual = dados.find(items=> items.id == objetoEsperado.id)
        
        notDeepEqual(actual, undefined)

    })
})
