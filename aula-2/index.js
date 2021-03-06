const util = require("util")
const obterEnderecoAsync = util.promisify(obterEndereco)


function obterUsuario(){

    return new Promise(function resolvePromisse(resolve, reject){
        setTimeout(function(){
            return resolve ({
                id: 1,
                nome: 'Aladin',
                dataNascimento : new Date()
            })
        }, 1000)
    })

}

function obterTelefone(idUsuario){
    return new Promise(function resolvePromisse(resolve, reject){
        
        setTimeout(() => {
            return resolve({
                numero: '1100312312',
                ddd: '11'
            })
        }, 2000);


    })

}

function obterEndereco(idUsuario, callback){
    setTimeout( ()=> {
        return callback(null, {
            rua: 'rua dos bobos',
            numero: 0
        })
    }, 2000)

}

main()
async function main(){
    try{
        console.time('medida-promise')   
        const usuario = await obterUsuario();
        // const telefone = await obterTelefone(usuario.id)
        // const endereco = await obterEnderecoAsync(usuario.id)
        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])
        const telefone = resultado[0]
        const endereco = resultado[1]
        console.log(`
            Nome: ${usuario.nome}
            Telefone: (${telefone.ddd}) ${telefone.numero}
            Endereco: ${endereco.rua} ${endereco.numero}
        `)
        console.timeEnd('medida-promise')
    } catch(error){
        console.error('DEU RUIM', error)
    }
}

// const usuarioPromise = obterUsuario()

// usuarioPromise
// .then(function(usuario){
//    return obterTelefone(usuario.id)
//    .then(function resolverTelefone(result){
//        return {
//             usuario:{
//                 nome: usuario.nome,
//                 id: usuario.id
//             },
//             telefone: result
//        }
//    })
// })
// .then(function(resultado){
//     const endereco = obterEnderecoAsync(resultado.usuario.id)
//     return endereco.then(function resolverEndereco(result){
//         return{
//             usuario: resultado.usuario,
//             telefone: resultado.telefone,
//             endereco: result
//         }
//     })
// })
// .then(function (resultado){
//     console.log(`
//     Nome: ${resultado.usuario.nome}
//     Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
//     Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.numero}

//     `)
// })
// .catch(function (error){
//     console.log('error', error)
// })

// // obterUsuario(function resolverUsuario(error, usuario){
  
// //     obterTelefone(usuario.id, function resolverTelefone(error1, telefone){
// //         if(error1){
// //             console.error('DEU ERRADO em TELEFONE', error1)
// //             return;
// //             }
// //             obterEndereco(usuario.id, function resolverEndereco(error2, endereco){
// //                 if(error2){
// //                     console.log('DEU ERRADO em ENDERECO', error2)
// //                     return;
// //                 }
// //                 console.log(`
// //                 Nome: ${usuario.nome},
// //                 Endereco: ${endereco.rua}, ${endereco.numero}
// //                 Telefone: (${telefone.ddd})${telefone.numero}
                
        
// //                 `)
// //             })
// //     })


// // })
// //const telefone = obterTelefone(usuario.id);
// //console.log('telefone', telefone) 