// Jogo de separação de sílabas // MOBILE


//Variáveis globais
var total_palavras = []
var acertos = 0;
var erros = 0;

///////////////////////
///////////////////////

window.onload = function () {

    
    total_palavras = base_palavras_mobile.map(i => i.palavra)

    //Tira palavras com parênteses
    total_palavras = total_palavras.filter((j) => /(\(|\))/i.test(j) === false)

    total_palavras = total_palavras.filter((k) => k !== 'undefined')

}

//Botão REFRESH
function novo_jovo() {
    window.location.reload()
};

//Função que retorna o número de sílabas
function numero_silabas() {

    //Padrão Regex
    const padrao_silabas = new RegExp('(?:ch|nh|lh|gu|gü|qu|gn|ps|^cu(?=i(?!m))|^mu(?=i)|[mnzskjhx]|[fpbvtdcçrg][lr]?|[lr])?(?:[ieaoíéêáâãóõôu][iu](?![iuz]$)[iu]?|[u(i)]|[aáãâ][eo]|[õó][e]|[ieaouíéêáâãóõôúü])(?:(?:(?:(?:n(?!h)|d(?![rl])|m|c(?![rlh])|t(?![lr])|z|x|p(?![slr])|b(?![rl])|g[?!rl])s?(?![ieaouíéêáâãóõôúü]))|(?:(?:i$)(?![ieaouíéêáãâóõôúüs]))|(?:(?:s)(?![ieaouíéêáãâóõôúü]))|(?:(?:l)(?![hieaouíéêáãâóõôúü]))|(?:(?:g)(?![hrlnieaouíéêáãâóõôúü]))|(?:(?:r)(?![ieaouíéêáâãóõôúü]))|(?:(?:f)(?![rlieaouíéêáâãóõôúü]))))?', 'g');

    var texto = document.getElementById("palavra_aleatoria").value;
    var silabas = texto.toLowerCase().match(padrao_silabas);
    tamanho = silabas.length;

    return tamanho;
};


//Separação de sílabas de acordo com padrão RegEx
function separarSilabas() {
    
    //Padrão Regex
    const padrao_silabas = new RegExp('(?:ch|nh|lh|gu|gü|qu|gn|ps|^cu(?=i(?!m))|^mu(?=i)|[mnzskjhx]|[fpbvtdcçrg][lr]?|[lr])?(?:[ieaoíéêáâãóõôu][iu](?![iuz]$)[iu]?|[u(i)]|[aáãâ][eo]|[õó][e]|[ieaouíéêáâãóõôúü])(?:(?:(?:(?:n(?!h)|d(?![rl])|m|c(?![rlh])|t(?![lr])|z|x|p(?![slr])|b(?![rl])|g[?!rl])s?(?![ieaouíéêáâãóõôúü]))|(?:(?:i$)(?![ieaouíéêáãâóõôúüs]))|(?:(?:s)(?![ieaouíéêáãâóõôúü]))|(?:(?:l)(?![hieaouíéêáãâóõôúü]))|(?:(?:g)(?![hrlnieaouíéêáãâóõôúü]))|(?:(?:r)(?![ieaouíéêáâãóõôúü]))|(?:(?:f)(?![rlieaouíéêáâãóõôúü]))))?', 'g');


    var texto = document.getElementById("palavra_aleatoria").value;
    var silabas = texto.toLowerCase().match(padrao_silabas);
    var imprimir = silabas.join(".");
    return imprimir
};
 

//Função que faz a contagem de tempo
function iniciar_jogo() {

    clearInterval(intervalo)

    document.getElementById("opcoes_silabas_jogo").style.visibility = "visible"
    document.getElementById("botao_jogo_silabador").style.visibility = "visible"

    var tempo = 60;

    //Limpar os acertos e erros anteriores
    acertos = 0;
    erros = 0;

    document.getElementById("acertos").innerHTML = "Acertos: "+acertos;
    document.getElementById("erros").innerHTML = "Erros: "+erros;

    //Limpar os resultados anteriores
    document.getElementById("resultado").innerHTML = "&nbsp;"
    document.getElementById("gabarito").innerHTML = "&nbsp;"

    //Gera uma nova palavra para iniciar o jogo
    nova_palavra()

    //Timer
    var intervalo = setInterval(() => {
        
        tempo--;

        if (tempo % 2 === 0) {

            document.getElementById("counter_silabas").innerHTML = '<mark>tempo: '+tempo+' s</mark>'

        } else if (tempo < 0) {

            document.getElementById("botao_jogo_silabador").setAttribute('disabled', 'disabled')

            clearInterval(intervalo)

            //document.getElementById("counter").innerHTML = "tempo: 60 s";

            if (erros===1) {
                document.getElementById("resultado").innerHTML = "Você teve "+acertos+" acertos e "+erros+" erro."
            } else if (acertos===1) {
                document.getElementById("resultado").innerHTML = "Você teve "+acertos+" acerto e "+erros+" erros."
            } else if (erros===1 && acertos ===1) {
                document.getElementById("resultado").innerHTML = "Você teve "+acertos+" acerto e "+erros+" erro."
            } else {
                document.getElementById("resultado").innerHTML = "Você teve "+acertos+" acertos e "+erros+" erros."
            }

            let pontuacao = acertos-erros

            document.getElementById("gabarito").innerHTML = 'Sua pontuação é <mark>'+pontuacao+'</mark>.'

        } else {
            
            document.getElementById("counter_silabas").innerHTML = "tempo: "+tempo+" s";

        }

    }, 1000);

};

//Função que compara a resposta com a silabação feita pelo silabador
function resultado_final(resposta, tamanho) {
    if (resposta === tamanho) {

        acertos +=1;
        document.getElementById("acertos").innerHTML = "Acertos: "+acertos;

        if (tamanho === 1) {
            document.getElementById("resultado").innerHTML = "Correto! Há 1 sílaba.";
        } else {
            document.getElementById("resultado").innerHTML = "Correto! Há "+tamanho+" sílabas.";
        }
        
    } else if (resposta !== tamanho) {

        erros +=1;
        document.getElementById("erros").innerHTML = "Erros: "+erros;

        if (tamanho === 1) {
            document.getElementById("resultado").innerHTML = "Errado... Há "+tamanho+" sílaba.";
        } else {
            document.getElementById("resultado").innerHTML = "Errado. Há "+tamanho+" sílabas.";
        };
        
    };
    let gabarito = separarSilabas().toString();
    document.getElementById("gabarito").innerHTML = '<mark>'+gabarito+'</mark>';
};

function nova_palavra() {

    let nova_palavra_aleatoria = total_palavras[Math.floor(Math.random() * total_palavras.length)];

    document.getElementById("palavra_aleatoria").innerHTML = nova_palavra_aleatoria;

    document.getElementById("resultado").innerHTML = "&nbsp;"
    document.getElementById("gabarito").innerHTML = "&nbsp;"
}

//Botões de números

let botoes = document.getElementsByClassName("numero")

Array.from(botoes).forEach(element => {

    element.addEventListener("click", function() {
        resposta = parseInt(element.id);
        numero_silabas();
        resultado_final(resposta, tamanho);
    })

});


/////////////
//Fundo de estrelas

// Night Sky element

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
