
onmessage = function(message) {

    fetch('./base_palavras_mobile.json').then((resp) => {return resp.json()}).then((a) => {

        let verificadas = 0;
    
        //let base_palavras_mobile = a.map(i => i.palavra)

        let base_palavras_mobile = Object.keys(a)

        console.log('tamanho da base: '+base_palavras_mobile.length)

        lista_palavras_possiveis = []

        let lista_menor = []
        
        message.data.forEach(ele => {

            let tamanho_ele = ele.length
            let parcial = base_palavras_mobile.filter(i => i.slice(0, tamanho_ele) === ele)

            parcial.forEach(j => {
                lista_menor.push(j)
            })

        })

        for (i = 0; i < message.data.length; i ++) {

            let lista_combinacoes = combinar(message.data)
            
            lista_combinacoes.forEach(element => {
    
                verificadas +=1;
            
                //let juncao_silabas = element.join("")
            
                if (lista_menor.find(i => i === element)) {
    
                    lista_palavras_possiveis.push(element)
            
                }
            
            })
    
            let primeiro = message.data.at(0)
    
            message.data.splice(message.data.at(0), 1)
    
            message.data.push(primeiro)

        }

        lista_palavras_possiveis = Array.from(new Set(lista_palavras_possiveis))

        //console.log(verificadas)

        postMessage(lista_palavras_possiveis)
    
    })

}


function combinar(lista) {
    const combine = (sub, ind) => {
        let result = []
        let i, l, p;
        for (i = ind, l = lista.length; i < l; i++) {
           p = sub.slice(0);
           p.push(lista[i]);
           result = result.concat(combine(p, i + 1));
           result.push(p.join(''));
        };
        return result;
    }
    return combine([], 0);
}


