const Commander = require("commander")
const DataBase = require("./database")
const Heroi = require("./Heroi")

async function main(){
    Commander
    .version('v 1.0')
    .option('-n, --nome [value]', "Nome do heroi")
    .option('-p --poder [value]', "Poder do heroi")
    .option('-i --id [value]', "Id do heroi")
    .option('-c --cadastrar', "Cadastrar um heroi")
    .option('-l --listar', "Listar todos os herois")
    .option('-d --deletar', "Deleta um heroi especifico, ou todos os herois")
    .option('-a --atualizar [value]', "Atualiza um heroi pelo id")
    .parse(process.argv)

const heroi = new Heroi(Commander)

    try{
        if(Commander.cadastrar){
                const resultadoCadastrar = await DataBase.cadastrar(heroi) 
                if(!resultadoCadastrar){
                    console.log('Deu ruim')
                    return;
            }else{
                console.log('Cadastrado com sucesso!')
                }
        }

        
        if(Commander.deletar){
            const resultadoDeletar = (heroi.id)? await DataBase.deletar(parseInt(heroi.id)) : await DataBase.deletar()
            if(resultadoDeletar){
                console.log('Deletado com sucesso!')
            } else
            {
                console.log('Não foi possivel deletar')
            }
            
        }
        
        if(Commander.atualizar){
            const idParaAtualizar = parseInt(Commander.atualizar)
            const dado = JSON.stringify(heroi)
            const heroiAtualizar = JSON.parse(dado)
            const resultadoAtualizar  = await DataBase.update(idParaAtualizar, heroiAtualizar)
            if(!resultadoAtualizar){
                console.log('Não foi possivel atualizar o heroi')
            }else {
                console.log('Atualizado com sucesso!')
            }

            
        }
        if(Commander.listar){           
        
            const resultadoListar = (heroi.id)? await DataBase.listar(parseInt(heroi.id))  : await DataBase.listar()
            console.log(resultadoListar)
        }
        
    }catch(error){
        console.log('Deu ruim', error)
    }
}

main()