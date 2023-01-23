onmessage = function(message) {

if (message.data = "palavra") {

    fetch('./base_mobile_2.json').then((resp) => {return resp.json()}).then((a) => {

        let total_palavras = a.map(i => i.palavra)

        total_palavras = total_palavras.filter((j) => /(\(|\))/i.test(j) === false)

        total_palavras = total_palavras.filter((k) => k !== 'undefined')

        let nova_palavra_aleatoria = total_palavras[Math.floor(Math.random() * total_palavras.length)];



        postMessage(nova_palavra_aleatoria)

    })

}

}