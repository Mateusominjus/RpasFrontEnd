

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
function pesquisar(){
    let senha = document.getElementById("senha").value;
    let ambiente = document.getElementById("ambiente").value;
    let processo = document.getElementById("processo").value;
    
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




