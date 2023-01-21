//Botão REFRESH
function novo_jovo() {
    window.location.reload()
};

let acertos = 0;
let erros = 0;


//Função que faz a contagem de tempo
function iniciar_jogo() {

    clearInterval(intervalo)

    var tempo = 60;

    //Limpar os acertos e erros anteriores
    acertos = 0;
    erros = 0;

    document.getElementById("acertos_verbos").innerHTML = "Acertos: "+acertos;
    document.getElementById("erros_verbos").innerHTML = "Erros: "+erros;

    //Limpar os resultados anteriores
    limpar_nivel()
    limpar_principal()
    limpar_resultado()

    //Gera uma nova palavra para iniciar o jogo
    gerar_verbo_aleatorio()
    

    //Timer
    var intervalo = setInterval(() => {
        
        tempo--;

        if (tempo % 2 === 0) {

            document.getElementById("counter").innerHTML = '<mark>tempo: '+tempo+' s</mark>'


        } else if (tempo < 0) {

            clearInterval(intervalo)

            //document.getElementById("counter").innerHTML = "tempo: 60 s";

            limpar_resultado()

            let pontuacao = acertos-erros

            let ultimo = document.getElementById("container_maior")
            let resultado = document.createElement('div')
            resultado.id = "resultado_final"
            resultado.innerHTML = 'Sua pontuação é <mark>'+pontuacao+'</mark>.'
            ultimo.appendChild(resultado)
            
        } else {
            
            document.getElementById("counter").innerHTML = "tempo: "+tempo+" s";

        }

    }, 1000);

};

let botoes_modo_originais = '<div id="barra_modos"><div class="div_botao_modos"><button class="botao_temposverbais" id="modo_indicativo" onclick="modo_indicativo()">indicativo</button></div><div class="div_botao_modos"><button class="botao_temposverbais" id="modo_subjuntivo" onclick="modo_subjuntivo()">subjuntivo</button></div><div class="div_botao_modos"><button class="botao_temposverbais" id="modo_imperativo" onclick="modo_imperativo()">imperativo</button></div>'

function restore_modos() {
    document.getElementById("container_maior").innerHTML = botoes_modo_originais
    //document.getElementById("tabela_formas_verbais").style = "display: table;"
}

function limpar_nivel() {

    if (document.getElementById("parte_especifica")) {
        document.getElementById("container_maior").removeChild(document.getElementById("parte_especifica"))
    }

}

function limpar_principal() {

    if (document.getElementById("parte_principal")) {
        document.getElementById("container_maior").removeChild(document.getElementById("parte_principal"))

    }
}

function limpar_resultado() {

    if (document.getElementById("resultado_final")) {
        document.getElementById("container_maior").removeChild(document.getElementById("resultado_final"))
    }

}

function responder(bla) {


    if(bla.id === 'presente indicativo') {
        bla.style= "background-color: var(--destaque); ; font-size:1em"
        document.getElementById("passado indicativo").style = " background-color: var(--amarelo_escuro1); font-size:0.8em"
        document.getElementById("futuro indicativo").style = " background-color: var(--amarelo_escuro1); font-size:0.8em"

    }

    if(bla.id === "pretérito imperfeito indicativo") {
        bla.style = "background-color: var(--destaque); font-size: 0.8em"
        document.getElementById("pretérito perfeito indicativo").style = "background-color: var(--amarelo_escuro1); font-size: 0.8em"
        document.getElementById("pretérito mais-que-perfeito indicativo").style = "background-color: var(--amarelo_escuro1); font-size: 0.8em"
    }

    if(bla.id === "pretérito perfeito indicativo") {
        bla.style = "background-color: var(--destaque); font-size: 0.8em"
        document.getElementById("pretérito imperfeito indicativo").style = "background-color: var(--amarelo_escuro1); font-size: 0.8em"
        document.getElementById("pretérito mais-que-perfeito indicativo").style = "background-color: var(--amarelo_escuro1); font-size: 0.8em"
    }

    if(bla.id === "pretérito mais-que-perfeito indicativo") {
        bla.style = "background-color: var(--destaque); font-size: 0.8em"
        document.getElementById("pretérito imperfeito indicativo").style = "background-color: var(--amarelo_escuro2); font-size: 0.8em"
        document.getElementById("pretérito perfeito indicativo").style = "background-color: var(--amarelo_escuro2); font-size: 0.8em"
    }

    if(bla.id === "futuro do presente indicativo") {
        
        bla.style = "background-color: var(--destaque); font-size: 0.8em"
        document.getElementById("futuro do pretérito indicativo").style = "background-color: var(--amarelo_escuro2); font-size: 0.8em"
        
    }

    if(bla.id === "futuro do pretérito indicativo") {
        bla.style = "background-color: var(--destaque); font-size: 0.8em"
        document.getElementById("futuro do presente indicativo").style = "background-color: var(--amarelo_escuro2); font-size: 0.8em"
        
    }

    if(bla.id === "pretérito imperfeito subjuntivo") {
        bla.style = "background-color: var(--destaque); font-size:1.4m"
        document.getElementById("presente subjuntivo").style = "background-color: var(--amarelo_escuro1); font-size:1em"
        document.getElementById("futuro subjuntivo").style = "background-color: var(--amarelo_escuro1); font-size:1em"
    }

    if(bla.id === "presente subjuntivo") {
        bla.style = "background-color: var(--destaque);; font-size:1em"
        document.getElementById("pretérito imperfeito subjuntivo").style = "background-color: var(--amarelo_escuro1); font-size:0.8em"
        document.getElementById("futuro subjuntivo").style = "background-color: var(--amarelo_escuro1); font-size:0.8em"
    }

    if(bla.id === "futuro subjuntivo") {
        bla.style = "background-color: var(--destaque); font-size:1em"
        document.getElementById("presente subjuntivo").style = "background-color: var(--amarelo_escuro1); font-size:0.8em"
        document.getElementById("pretérito imperfeito subjuntivo").style = "background-color: var(--amarelo_escuro1); font-size:0.8em"
    }

    if(bla.id === "positivo imperativo") {
        bla.style = "background-color: var(--destaque); font-size:1em"
        document.getElementById("negativo imperativo").style = "background-color: var(--amarelo_escuro1); font-size:0.8em"
    }

    if(bla.id === "negativo imperativo") {
        bla.style = "background-color: var(--destaque); font-size:1em"
        document.getElementById("positivo imperativo").style = "background-color: var(--amarelo_escuro1); font-size:0.8em"
    }

    let ultimo = document.getElementById("container_maior")

    //Se a resposta está certa ou errada
    if (gabarito.includes(bla.id)) {
        limpar_resultado()

        acertos += 1;
        document.getElementById("acertos_verbos").innerHTML = 'Acertos: '+acertos
        let resultado = document.createElement('div')
        resultado.id = "resultado_final"
        resultado.innerHTML = 'Correto!'
        ultimo.appendChild(resultado)

    } else {
        limpar_resultado()
        erros +=1;
        document.getElementById("erros_verbos").innerHTML = 'Erros: '+erros

        let resultado = document.createElement('div')
        resultado.id = "resultado_final"
        resultado.innerHTML = 'Tente novamente.'
        ultimo.appendChild(resultado)

    }

    

    ultimo.insertAdjacentHTML = '<div id="resultado_final"></div>'

    console.log(bla.id)
    
}

function modo_indicativo() {

    limpar_nivel()
    limpar_principal()
    limpar_resultado()
    document.getElementById("barra_modos").insertAdjacentHTML('afterend', '<div id="parte_principal"><div class="div_botao"><button class="botao_temposverbais_principal" id="passado indicativo" onclick="passado_ind()">passado</button></div><div class="div_botao"><button class="botao_temposverbais_principal" id="presente indicativo" onclick="limpar_nivel();responder(this)">presente</button></div><div class="div_botao"><button class="botao_temposverbais_principal" id="futuro indicativo" onclick="futuro_ind()">futuro</button></div></div>')
    


    document.getElementById("modo_indicativo").style = "font-size: 1em; background-color: var(--destaque)"
    document.getElementById("modo_subjuntivo").style = "font-size: 0.8em"
    document.getElementById("modo_imperativo").style = "font-size: 0.8em"


};


function passado_ind() {

    limpar_nivel()
    limpar_resultado()
    document.getElementById("parte_principal").insertAdjacentHTML('afterend', '<div id="parte_especifica"><div class="div_botao"><button class="botao_temposverbais_especifica" id="pretérito imperfeito indicativo" onclick="responder(this)" style="font-size: 0.8em;">imperfeito</button></div><div class="div_botao"><button class="botao_temposverbais_especifica" id="pretérito perfeito indicativo" onclick="responder(this)" style="font-size: 0.8em;">perfeito</button></div><div class="div_botao"><button class="botao_temposverbais_especifica" id="pretérito mais-que-perfeito indicativo" onclick="responder(this)" style="font-size: 0.8em;">mais que perfeito</button></div></div></div>')

    
    document.getElementById("passado indicativo").style = " background-color: var(--destaque); font-size:1em"
    document.getElementById("futuro indicativo").style = " background-color: var(--amarelo_escuro1); font-size:0.8em"
    document.getElementById("presente indicativo").style = " background-color: var(--amarelo_escuro1); font-size:0.8em"
    
}

function futuro_ind() {

    limpar_nivel()
    limpar_resultado()
    document.getElementById("parte_principal").insertAdjacentHTML('afterend', '<div id="parte_especifica"><div class="div_botao"><button class="botao_temposverbais_especifica" id="futuro do pretérito indicativo" onclick="responder(this)" style="font-size: 0.8em;">do passado</button></div><div class="div_botao"><button class="botao_temposverbais_especifica" id="futuro do presente indicativo" onclick="responder(this)" style="font-size: 0.8em;">do presente</button></div></div></div>')
    document.getElementById("parte_especifica").style = "width: 75%;"

    document.getElementById("futuro indicativo").style = " background-color: var(--destaque); font-size:1em"
    document.getElementById("passado indicativo").style = " background-color: var(--amarelo_escuro1); font-size:0.8em"
    document.getElementById("presente indicativo").style = " background-color: var(--amarelo_escuro1); font-size:0.8em"
    
}

function modo_subjuntivo() {

    limpar_nivel()
    limpar_principal()
    limpar_resultado()

    document.getElementById("barra_modos").insertAdjacentHTML('afterend', '<div id="parte_principal"><div class="div_botao"><button class="botao_temposverbais_principal" id="pretérito imperfeito subjuntivo" onclick="responder(this)">passado</button></div><div class="div_botao"><button class="botao_temposverbais_principal" id="presente subjuntivo" onclick="responder(this)">presente</button></div><div class="div_botao"><button class="botao_temposverbais_principal" id="futuro subjuntivo" onclick="responder(this)">futuro</button></div></div>')
    
    document.getElementById("modo_indicativo").style = "font-size: 0.8em"
    document.getElementById("modo_subjuntivo").style = "font-size: 1em; background-color: var(--destaque)"
    document.getElementById("modo_imperativo").style = "font-size: 0.8em"

};
 
function modo_imperativo() {

    limpar_nivel()
    limpar_principal()
    limpar_resultado()
    document.getElementById("barra_modos").insertAdjacentHTML('afterend', '<div id="parte_principal"><div class="div_botao"><button class="botao_temposverbais_principal" id="negativo imperativo" onclick="responder(this)">negativo</button></div><div class="div_botao"><button class="botao_temposverbais_principal" id="positivo imperativo" onclick="responder(this)">positivo</button></div></div>')
    document.getElementById("parte_principal").style = "width: 75%;"
    
    document.getElementById("modo_indicativo").style = "font-size: 0.8em"
    document.getElementById("modo_subjuntivo").style = "font-size: 0.8em"
    document.getElementById("modo_imperativo").style = "font-size: 1em; background-color: var(--destaque)"

};

function gerar_verbo_aleatorio() {

    restore_modos()
    limpar_resultado()

    gabarito = []

    const tempo_possiveis = [presente_ind, pret_imperfeito_ind, pret_perfeito_ind, pret_maisque_ind, futuro_pres_ind, futuro_pret_ind, presente_sub, pret_imperfeito_sub, futuro_sub, presente_imperat_positivo, presente_imperat_negativo];

    let um_tempo = tempo_possiveis[Math.floor(Math.random() * tempo_possiveis.length)];

    let pessoa_aleatoria = ''

    //Se for imperativo, escolher sobre as segundas pessoas do singular e plural
    if (um_tempo === presente_imperat_positivo | um_tempo === presente_imperat_negativo) {

        const pessoas = ['2ps', '2pp']

        pessoa_aleatoria = pessoas[Math.floor(Math.random() * pessoas.length)];

    } else {

        const pessoas = ['1ps', '2ps', '3ps', '1pp', '2pp', '3pp']

        pessoa_aleatoria = pessoas[Math.floor(Math.random() * pessoas.length)];

    }

    let pessoa_imprimir = ''

    if (pessoa_aleatoria === '1ps') {
        pessoa_imprimir = 'eu'
    } else if (pessoa_aleatoria === '2ps') {
        pessoa_imprimir = 'tu'
    } else if (pessoa_aleatoria === '3ps') {
        pessoa_imprimir = 'ele'
    } else if (pessoa_aleatoria === '1pp') {
        pessoa_imprimir = 'nós'
    } else if (pessoa_aleatoria === '2pp') {
        pessoa_imprimir = 'vós'
    } else if (pessoa_aleatoria === '3pp') {
        pessoa_imprimir = 'eles'
    }

    

    let imprimir = um_tempo(2)
    
    //Se for imperativo, o nome do atributo muda
    if (imprimir['modo'] === 'imperativo') {

        //Se for imperativo negativo, incluir o não
        if (imprimir['maneira'] === 'negativo') {

            imprimir[pessoa_aleatoria] = 'não '+imprimir[pessoa_aleatoria]

        }

        gabarito.push(imprimir['maneira']+' '+imprimir['modo'])

    //Se for a 1pp do presente do indicativo, também pode ser a 1pp do pretérito perfeito do indicativo
    } else if (imprimir['tempo'] === 'presente' && imprimir['modo'] === "indicativo" && pessoa_aleatoria === '1pp') {

        gabarito.push(imprimir['tempo']+' '+imprimir['modo'])

        gabarito.push('pretérito perfeito '+imprimir['modo'])

    //Se for a 1pp do pretérito perfeito do indicativo, também pode ser a 1pp do presente do indicativo
    } else if (imprimir['tempo'] === 'pretérito perfeito' && imprimir['modo'] === "indicativo" && pessoa_aleatoria === '1pp') {

        gabarito.push(imprimir['tempo']+' '+imprimir['modo'])

        gabarito.push('presente '+imprimir['modo'])

    //Se for a 3pp do pretérito perfeito do indicativo, também pode ser a 3pp do pretérito mais-que-perfeito do indicativo
    } else if (imprimir['tempo'] === "pretérito perfeito" && imprimir['modo'] === "indicativo" && pessoa_aleatoria === '3pp') {

        gabarito.push(imprimir['tempo']+' '+imprimir['modo'])

        gabarito.push('pretérito mais-que-perfeito '+imprimir['modo'])

    //Se for a 3pp do pretérito mais-que-perfeito do indicativo, também pode ser a 3pp do pretérito perfeito do indicativo
    } else if (imprimir['tempo'] === "pretérito mais-que-perfeito" && imprimir['modo'] === "indicativo" && pessoa_aleatoria === '3pp') {
        
        gabarito.push(imprimir['tempo']+' '+imprimir['modo'])

        gabarito.push('pretérito perfeito '+imprimir['modo'])

    } else {

        gabarito.push(imprimir['tempo']+' '+imprimir['modo'])

    }





    if (imprimir['modo'] === 'imperativo') {

        document.getElementById("palavra_aleatoria_verbos").innerHTML = imprimir[pessoa_aleatoria]

    } else if (imprimir['modo'] === 'subjuntivo') {


        if (imprimir['tempo'] === 'futuro') {

            document.getElementById("palavra_aleatoria_verbos").innerHTML = 'quando '+pessoa_imprimir+' '+imprimir[pessoa_aleatoria]

        } else if (imprimir['tempo'] === 'presente') {

            document.getElementById("palavra_aleatoria_verbos").innerHTML = 'que '+pessoa_imprimir+' '+imprimir[pessoa_aleatoria]

        } else if (imprimir['tempo'] === 'passado') {

            document.getElementById("palavra_aleatoria_verbos").innerHTML = 'se '+pessoa_imprimir+' '+imprimir[pessoa_aleatoria]

        }
        
    } else {
        //Imprime a forma verbal a ser analisada pela pessoa
        document.getElementById("palavra_aleatoria_verbos").innerHTML = pessoa_imprimir+' '+imprimir[pessoa_aleatoria]
    }


    return gabarito

}



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
