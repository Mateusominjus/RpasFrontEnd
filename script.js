let resposta = null
let documento_atual = 0

function seta_documento(index){
    if(!resposta){
        return 
    }
    let documento = resposta.documentos[index]
    if(!documento){
        return
    }
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
    ).then(function(response) {
        resposta = response.json();

    })
}