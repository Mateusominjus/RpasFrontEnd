

function seta_lista_de_documentos(resposta){
    lista_de_documentos = document.getElementById("lista_de_documentos")
     resposta.documentos.map((documento) => {
            opcao = document.createElement("option")
            opcao.innerHTML = documento.nome 
            lista_de_documentos.appendChild(opcao)
    })
    lista_de_documentos.onchange= () => {
        let documento = resposta.documentos[lista_de_documentos.selectedIndex]  
        document.getElementById("iframe").src = documento.url
        seta_documento(lista_de_documentos.selectedIndex)                
    }
}

function seta_dados_do_processo(resposta){
     dados_do_processo = document.getElementById("dados_do_processo")
     delete resposta.processo.json_plataforma
     dados_do_processo.innerHTML = JSON.stringify(resposta.processo, undefined, 4)
}


function pesquisar_processo(processo){
    let senha = document.getElementById("senha").value;
    let ambiente = document.getElementById("ambiente").value;
    
    //fetch with cors 
    
    fetch(
        'https://lfklzr5jsotrttsdjaymmzky7q0tlvtn.lambda-url.us-east-1.on.aws/dados_do_processo',
     {
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin':'*',
          'senha': senha,
           'ambiente': ambiente,
           'processo': processo
        }
     }
    ).then(response =>response.text()).then(data =>{
        
        try{
            var resposta = JSON.parse(data)
        }catch(e){
            alert(data)
            return
        }
        seta_lista_de_documentos(resposta)
        seta_dados_do_processo(resposta)
   
    })
}




function pesquisar_todos_processos(){

    let senha = document.getElementById("senha").value;


    let ambiente = document.getElementById("ambiente")
    ambiente = ambiente.options[ambiente.selectedIndex].value

    //bate na api
    fetch(
        'https://lfklzr5jsotrttsdjaymmzky7q0tlvtn.lambda-url.us-east-1.on.aws/todos_processos',
     {
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin':'*',
          'senha': senha,
           'ambiente': ambiente
        }
     }
    ).then(response =>response.text()).then(data =>{
        
        try{
            var processos = JSON.parse(data)
        }catch(e){
            //Caso ocorra algum erro, exibe o erro na tela
            alert(data)
            return
        }
        select_processos = document.getElementById("processos")
        //reseta tudo
        select_processos.innerHTML = ''
        lista_de_documentos = document.getElementById("lista_de_documentos")
        lista_de_documentos.innerHTML = ''
        dados_do_processo = document.getElementById("dados_do_processo")
        dados_do_processo.innerHTML = ''

        processos.map((processo) => {
            opcao = document.createElement("option")
            opcao.innerHTML = processo
            select_processos.appendChild(opcao)

        })
        select_processos.onchange= () => {
            let processo = select_processos.options[select_processos.selectedIndex].text
            pesquisar_processo(processo)
        }
    })

}