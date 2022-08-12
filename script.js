
function seta_documento(index){
    if(!resposta){
        return 
    }
    if (resposta.documentos.length <= index){
        return
    }

    let documento = resposta.documentos[index]
  
    document.getElementById("documento").src = documento.url
}



function seta_lista_de_documentos(resposta){
    lista_de_documentos = document.getElementById("lista_de_documentos")
     resposta.documentos.map((documento) => {
            nome = document.createElement('p')
            nome.innerHTML = documento.nome 
            nome.onclick = () => {
                iframe = document.getElementById("iframe")
                iframe.src = documento.url
            }
            lista_de_documentos.appendChild(nome)
    })
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
            resposta = JSON.parse(data)
            seta_lista_de_documentos(resposta)
        }catch(e){
            alert(data)
            return
        }

   
    })
}




function adicionar_json_editor(){
    if(!resposta){
        return
    }
    const container = document.getElementById("jsoneditor")
    const options = {}
    const editor = new JSONEditor(container, options)

    // set json
    delete resposta.processo.json_plataforma
    editor.set(resposta.processo)

    // get json
    const updatedJson = editor.get()
}
