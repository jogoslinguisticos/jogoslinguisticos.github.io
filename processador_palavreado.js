

//let base_palavras_mobile = base_raw.then()

onmessage = function(message) {

    fetch('./base_mobile_2.json').then((resp) => {return resp.json()}).then((a) => {
    
        let base_palavras_mobile = a.map(i => i.palavra)

        console.log(base_palavras_mobile.at(150))

        lista_palavras_possiveis = []



        let lista_combinacoes = getCombinations(message.data)
            

        lista_combinacoes.forEach(element => {
        
            let juncao_silabas = element.join("")
        
            if (base_palavras_mobile.find(i => i === juncao_silabas)) {
                lista_palavras_possiveis.push(juncao_silabas)
        
            }
        
        })

        let primeiro = message.data.at(0)

        message.data.splice(message.data.at(0), 1)

        message.data.push(primeiro)

        lista_palavras_possiveis = Array.from(new Set(lista_palavras_possiveis))

        postMessage(lista_palavras_possiveis)
    
    })

}


function getCombinations(lista) {

    var combi = [];
    var temp = [];
    var slent = Math.pow(2, lista.length);

    for (var i = 0; i < slent; i++)
    {
        temp = [];
        for (var j = 0; j < lista.length; j++)
        {
            if ((i & Math.pow(2, j)))
            {
                temp.push(lista[j]);
            }
        }
        if (temp.length > 0)
        {
            combi.push(temp);
        }

    }

    combi.sort((a, b) => a.length - b.length);
    
    return combi;

}