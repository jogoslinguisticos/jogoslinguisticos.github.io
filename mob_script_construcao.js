//var lista_palavras_total = []

var lista_silabas_total = []

const stopwords = ['de', 'o', 'a', 'que', 'e', 'do', 'da', 'em', 'um', 'para', 'é', 'com', 'não', 'uma', 'os', 'no', 'se', 'na', 'por', 'mais', 'as', 'dos', 'como', 'mas', 'foi', 'ao', 'ele', 'das', 'tem', 'à', 'seu', 'sua', 'ou', 'ser', 'quando', 'muito', 'há', 'nos', 'já', 'está', 'eu', 'também', 'só','pelo', 'pela', 'até', 'isso', 'ela', 'entre', 'era', 'depois', 'sem', 'mesmo', 'aos', 'ter', 'seus', 'quem', 'nas', 'me', 'esse', 'eles', 'estão', 'você', 'tinha', 'foram', 'essa', 'num', 'nem', 'suas', 'meu', 'às', 'minha', 'têm', 'numa', 'pelos', 'elas', 'havia', 'seja', 'qual', 'será', 'nós', 'tenho', 'lhe', 'deles', 'essas', 'esses', 'pelas','este', 'fosse', 'dele', 'tu', 'te','vocês', 'vos', 'lhes', 'meus', 'minhas', 'teu', 'tua', 'teus', 'tuas', 'nosso','nossa', 'nossos', 'nossas','dela', 'delas', 'esta', 'estes','estas', 'aquele', 'aquela', 'aqueles', 'aquelas', 'isto', 'aquilo']

var lista_possiveis = []

let dicas_possiveis = []

let opcoes_silabas = document.getElementsByClassName("mover_square")

let palavras_corretas = []
 
let acertos = 0;
let erros = 0;
let dicas = 0;

let lista_palavras_possiveis = []

let pegar_dicas = []

let lista_silabas_rodada = []

pegar_dicas = lista_palavras_possiveis

const processador = new Worker('./processador_palavreado.js')


processador.onmessage = function(message) {

    console.log('palavras possíveis / lista recebida: '+message.data)

    message.data.forEach(ele => {

        lista_palavras_possiveis.push(ele)
        dicas_possiveis.push(ele)

    })

    document.getElementById("possibilidades").innerHTML = 'Possibilidades: <mark>'+lista_palavras_possiveis.length+'</mark>'

}


window.onload = function () {
    

    document.getElementById("acertos_cell").innerHTML = 'Encontradas: <mark>'+acertos+'</mark>'



    //lista_palavras_total = base_palavras_mobile.map(i => i.palavra)


    //Popular os quadrinhos com sílabas
    Array.from(opcoes_silabas).slice(0, 6).forEach(element => {

        let silaba_nova = top50[Math.floor(Math.random() * top50.length)];

        element.innerHTML = silaba_nova;

        top50.splice(top50.indexOf(silaba_nova), 1)
    })

    Array.from(opcoes_silabas).slice(6, 7).forEach(element => {

        const consoantes_aleatorias = ['r', 's', 'm', 'n', 'l']

        let silaba_nova = consoantes_aleatorias[Math.floor(Math.random() * consoantes_aleatorias.length)]

        element.innerHTML = silaba_nova;

    })


    Array.from(opcoes_silabas).slice(7).forEach(element => {

        let silaba_nova = silabas100[Math.floor(Math.random() * silabas100.length)];

        element.innerHTML = silaba_nova;

        silabas100.splice(silabas100.indexOf(silaba_nova), 1)
    })

    let lista_cards = Array.from(document.getElementsByClassName("mover_square"))

    let lista_silabas_possiveis = []

    

    lista_cards.forEach(element => {
        lista_silabas_possiveis.push(element.innerHTML)
    })

    lista_silabas_rodada = lista_silabas_possiveis

    //console.log('quantas silabas: '+lista_silabas_rodada.length)

    //Envia para o webworker as sílabas sorteadas
    processador.postMessage(lista_silabas_rodada)

};




//Botão REFRESH
function novo_jovo() {
    window.location.reload()
};


//////////////
//Funções adicionar e remover sílabas do construtor

let elem_destino = document.getElementById("destino")


function adicionar(evt) {

    
    let novo_elem = evt.target.cloneNode()
    novo_elem.innerHTML = evt.target.innerHTML

    //Remover com clique se estiver no "destino"
    novo_elem.addEventListener("click", function(bla) {
        if (bla.target.parentNode.id === "destino") {
            elem_destino.removeChild(bla.target)
        }
    })

    elem_destino.appendChild(novo_elem)
}

Array.from(opcoes_silabas).forEach(ele => {

    ele.addEventListener("click", adicionar);

});



//////////////
//////////////

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


function checar() {

    //Ler a palavra parcial
    let palavra_parcial = []
    let silabas_destino = document.getElementById("destino").children

    Array.from(silabas_destino).forEach(element => {
        palavra_parcial.push(element.innerHTML)
    })

    let palavra_resultante = palavra_parcial.join("")

    fetch('./base_palavras_mobile.json').then((resp) => {return resp.json()}).then((a) => {

        let lista_palavras_total = Object.keys(a)

        //Checar se existe
        if (lista_palavras_total.includes(palavra_resultante) && palavras_corretas.includes(palavra_resultante) === false) {

            palavras_corretas.push(palavra_resultante)

            let dados = a.palavra_resultante
            
            console.log("dados da palavra: "+dados)

            acertos += 1;
            
            let dados_palavra = tratar_dados(dados)

            document.getElementById("acertos_cell").innerHTML = 'Encontradas: <mark>'+acertos+'</mark>'

            

            if (dados_palavra['Classe'].length === 1) {

                if (dados_palavra['Classe'][0] === 'interjeição' | dados_palavra['Classe'][0] === 'conjunção') {

                    document.getElementById("status").innerHTML = 'Correto! <mark>'+palavra_resultante+'</mark> pode ser uma '+dados_palavra['Classe']

                } else {

                    document.getElementById("status").innerHTML = 'Correto! <mark>'+palavra_resultante+'</mark> pode ser um '+dados_palavra['Classe']


                }

                
            } else if (dados_palavra['Classe'].length > 1) {

                

                document.getElementById("status").innerHTML = 'Correto! <mark>'+palavra_resultante+'</mark> pode ser '+dados_palavra['Classe'].join(" ou ")

            }

        
        } else if (palavras_corretas.includes(palavra_resultante)) {

            document.getElementById("status").innerHTML = 'A palavra <mark>'+palavra_resultante+'</mark> já foi computada.'

        } else if (palavra_resultante === "") {

            document.getElementById("status").innerHTML = "Nenhuma palavra foi formada ainda."

        } else {
            erros += 1;
            //document.getElementById("erros").innerHTML = "Erros: "+erros
            document.getElementById("status").innerHTML = 'Não conhecemos a palavra <mark>'+palavra_resultante+'</mark>.'

        }

        console.log('tamanho da base de checar: '+lista_palavras_total.length)

    })

    


};

function tratar_dados(dados) {

    let dados_palavra = {
        'Classe': [],
        'Gênero': [],
        'Número': []
    }

    if (/\badj\./.test(dados)) {
               dados_palavra['Classe'].push('adjetivo')

            } else if (/\bs\./.test(dados)) {
                dados_palavra['Classe'].push('substantivo')

            } else if (/\bv\./.test(dados)) {
                dados_palavra['Classe'].push('verbo')
                
            } else if (/\badv\./.test(dados)) {
                dados_palavra['Classe'].push('advérbio')
        
            } else if (/\bnum\./.test(dados)) {
                dados_palavra['Classe'].push('numeral')
        
            } else if (/\bpron\./.test(dados)) {
                dados_palavra['Classe'].push('pronome')

            } else if (/\binterj\./.test(dados)) {
                dados_palavra['Classe'].push('interjeição')
        
            } else if (/\bprep\./.test(dados)) {
                dados_palavra['Classe'].push('preposição')
        
            } else if (/\bconj\./.test(dados)) {
                dados_palavra['Classe'].push('conjunção')
        
            } else if (/\bart\./.test(dados)) {
                dados_palavra['Classe'].push('artigo')
            }

    return dados_palavra

}


function limpar () {

    let silabas_destino = document.getElementById("destino")
    while (silabas_destino.lastElementChild) {
        silabas_destino.removeChild(silabas_destino.lastElementChild);
    }
    let div_fake = document.createElement('div')
    div_fake.className = "mover_square_fake"
    div_fake.innerHTML = ''
    div_fake.style = 'border: 1px solid rgb(195, 204, 218)'
    document.getElementById("destino").appendChild(div_fake)

    document.getElementById("status").innerHTML = '&nbsp;'

};

//////////////////////
//////////////////////

///Função interna da função consultar_sinonimo - retorna array ordenada pela frequencia
Array.prototype.byCount= function(){
    var itm, a= [], L= this.length, o= {};
    for(var i= 0; i<L; i++){
        itm= this[i];
        if(!itm) continue;
        if(o[itm]== undefined) o[itm]= 1;
        else ++o[itm];
    }
    for(var p in o) a[a.length]= p;
    return a.sort(function(a, b){
        return o[b]-o[a];
    });
};





function pedir_dica() {

    document.getElementById("destino").innerHTML = ""
    document.getElementById("status").innerHTML = '&nbsp;'

    

    let uma_dica = dicas_possiveis[Math.floor(Math.random() * dicas_possiveis.length)];


    dicas_possiveis.splice(dicas_possiveis.indexOf(uma_dica), 1)

    let dados_dica = base_palavras_mobile.find(i => i.palavra === uma_dica)

    let dados_palavra = tratar_dados(dados_dica.classe)

    let uma_dica_letras = uma_dica.split("")

    if (dados_palavra['Classe'].length === 1) {

        if (dados_palavra['Classe'][0] === 'interjeição' | dados_palavra['Classe'][0] === 'preposição' | dados_palavra['Classe'][0] === 'conjunção') {

            document.getElementById("status").innerHTML = uma_dica_letras[0].toUpperCase()+' _ '.repeat(uma_dica_letras.length-1)+' pode ser uma '+dados_palavra['Classe'][0]

        } else {

            document.getElementById("status").innerHTML = uma_dica_letras[0].toUpperCase()+' _ '.repeat(uma_dica_letras.length-1)+' pode ser um '+dados_palavra['Classe'][0]

        }

    } else {

        document.getElementById("status").innerHTML = uma_dica_letras[0].toUpperCase()+' _ '.repeat(uma_dica_letras.length-1)+' pode ser'+dados_palavra['Classe'].join(" ou ")

    }

    

};

//Separação de sílabas de acordo com padrão RegEx
function separarSilabas(palavra) {
    
    //Padrão Regex
    const padrao_silabas = new RegExp('(?:ch|nh|lh|gu|gü|qu|gn|ps|^cu(?=i(?!m))|^mu(?=i)|[mnzskjhx]|[fpbvtdcçrg][lr]?|[lr])?(?:[ieaoíéêáâãóõôu][iu](?![iuz]$)[iu]?|[u(i)]|[aáãâ][eo]|[õó][e]|[ieaouíéêáâãóõôúü])(?:(?:(?:(?:n(?!h)|d(?![rl])|m|c(?![rlh])|t(?![lr])|z|x|p(?![slr])|b(?![rl])|g[?!rl])s?(?![ieaouíéêáâãóõôúü]))|(?:(?:i$)(?![ieaouíéêáãâóõôúüs]))|(?:(?:s)(?![ieaouíéêáãâóõôúü]))|(?:(?:l)(?![hieaouíéêáãâóõôúü]))|(?:(?:g)(?![hrlnieaouíéêáãâóõôúü]))|(?:(?:r)(?![ieaouíéêáâãóõôúü]))|(?:(?:f)(?![rlieaouíéêáâãóõôúü]))))?', 'g');

    var silabas = palavra.toLowerCase().match(padrao_silabas);
    
    return silabas
};



function gerar_silabas() {

    let total_silabas = []

    lista_palavras_total.forEach(ele => {

        let silabas = separarSilabas(ele)

        silabas.forEach(j => {

            if (/\W/.test(j) === false) {
                total_silabas.push(j);
            }
            
        })

    })


    total_silabas = total_silabas.byCount().slice(0, 150)

    //total_silabas = Array.from(new Set(total_silabas))


}

/////////////
//Fundo de estrelas


const $el = document.body;

// Generate a random number between min and max values

const genRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
}

// Generate a star <div>

const genStar = () => {

    const star = document.createElement("div");
    star.classList.add("star");

    // Gen star coordinates relative to $el size
    let x = genRandomNumber(1, $el.offsetWidth);
    let y = genRandomNumber(1, $el.offsetHeight);

    const { style } = star;

    style.left = Math.floor(x) + "px";
    style.top = Math.floor(y) + "px";

    style.setProperty(
        "--star-size",
        genRandomNumber(1, 3) + "px"
    );

    style.setProperty(
        "--twinkle-duration",
        Math.ceil(genRandomNumber(1, 5)) + "s"
    );

    style.setProperty(
        "--twinkle-delay",
        Math.ceil(genRandomNumber(1, 5)) + "s"
    );

    return star;
}

for (let index = 0; index < 100; index++) {
    $el.append(genStar());
}


//////
//Sílabas usadas na construção

const top50 = [
    "a",
    "o",
    "to",
    "do",
    "ta",
    "de",
    "te",
    "co",
    "ti",
    "ra",
    "ri",
    "ci",
    "ca",
    "re",
    "li",
    "mo",
    "da",
    "ro",
    "ma",
    "se",
    "la",
    "na",
    "di",
    "es",
    "so",
    "men",
    "ni",
    "ar",
    "en",
    "mi",
    "in",
    "no",
    "pa",
    "si",
    "lo",
    "dor",
    "fi",
    "vel",
    "e",
    "pe",
    "sa",
    "me",
    "ga",
    "tar",
    "con",
    "des",
    "vi",
    "car",
    "pi",
    "bi",
    "tu",
    "gi",
    "po",
    "ba",
    "ce",
    "vo",
    "le",
    "ne",
    "va",
    "i",
    "al"
]

const silabas100 = [
    "go",
    "zar",
    "fa",
    "lar",
    "za",
    "tra",
    "bo",
    "rar",
    "pro",
    "nar",
    "pre",
    "su",
    "gra",
    "an",
    "du",
    "fo",
    "ter",
    "tri",
    "qui",
    "ve",
    "fe",
    "tro",
    "per",
    "que",
    "be",
    "ge",
    "gar",
    "ver",
    "lu",
    "mar",
    "em",
    "bu",
    "lha",
    "pu",
    "sen",
    "mu",
    "lis",
    "tor",
    "cer",
    "im",
    "dis",
    "gem",
    "ex",
    "cor",
    "dar",
    "sar",
    "par",
    "ren",
    "for",
    "nis",
    "ru",
    "res",
    "ten",
    "den",
    "cen",
    "can",
    "nal",
    "u",
    "xi",
    "lhar",
    "nha",
    "bar",
    "tre",
    "com",
    "jar",
    "nu",
    "fu",
    "gu",
    "ja",
    "man",
    "cha",
    "dei",
    "ris",
    "ran",
    "hi",
    "as",
    "tis",
    "ju",
    "bra",
    "lho",
    "por",
    "tan",
    "bri",
    "cri",
    "lan",
    "nho",
    "far",
    "der"
]
