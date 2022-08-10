let resposta = null
let documento_atual = 0

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

function vai_pro_proximo_documento(){
    documento_atual++
    seta_documento(documento_atual)
}
function vai_pro_documento_anterior(){
    documento_atual--
    seta_documento(documento_atual)
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
        }catch(e){
            alert(data)
            return
        }
   
        seta_documento(0)
        adicionar_json_editor()
    })
}
