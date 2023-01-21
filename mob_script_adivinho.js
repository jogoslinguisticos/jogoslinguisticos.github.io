//Botão REFRESH
function novo_jovo() {
    window.location.reload()
};

const lista_raw = base_palavras_mobile.map(i => i.palavra)

//A letra que foi chutada por último
var letra_guess = "";

//Quantos chutes foram dados
var chutes_total = 0;

//Palavras que foram chutadas
var quais_palavras_chutadas = [];

//Quantas letras já foram chutadas
var letras_chutadas = 1;

//Quantas letras já foram usadas
var letras_usadas = 0;

//Quais letras chutadas foram descartadas
var letras_descartadas = [];

//Quantas pelavras têm o mesmo tamanho
let lista_mesmo_tamanho = [];

let numero_dicas = 0;


//Quantas vezes a letra_guess foi adicionada no blank
var clique = 0;

/////////////////
/////////////////
//Funções
/////////////////
/////////////////

//Botões de número

let botoes_numero = document.getElementsByClassName("numero")

Array.from(botoes_numero).forEach(ele => {

    ele.addEventListener("click", function() {
        gerar_blanks(parseInt(ele.id))
    })

})



//Gera os blanks de acordo com o botão clicado
function gerar_blanks (resposta) {

    letras_descartadas = [];

    //Criar tabela para os blanks
    document.getElementById("div_central_adivinho").innerHTML = ''

    let tabela_dos_blanks = document.createElement('table')
    tabela_dos_blanks.id = "tabela_blanks"
    let linha_blanks = document.createElement('tr')
    linha_blanks.id = "row_blanks_letras"
    tabela_dos_blanks.appendChild(linha_blanks)
    document.getElementById("div_central_adivinho").appendChild(tabela_dos_blanks)


    //Criar a tabela de opções secundárias
    let tabela_opcoes = document.createElement('table')
    tabela_opcoes.id = 'tabela_opcoes_vogais'
    let linha_opcoes = document.createElement('tr')
    linha_opcoes.id = 'row_opcoes_vogais'
    tabela_opcoes.append(linha_opcoes)
    document.getElementById("div_central_adivinho").appendChild(tabela_opcoes)


    //Criar a tabela da nova sugestao
    let tabela_proxima = document.createElement('table')
    tabela_proxima.id = 'tabela_sugestoes'

    let linha_proxima = document.createElement('tr')
    tabela_opcoes.append(linha_proxima)
    let cell_proxima = document.createElement('td')
    cell_proxima.id = "cell_nao"
    linha_proxima.appendChild(cell_proxima)

    let linha_proxima2 = document.createElement('tr')
    tabela_opcoes.append(linha_proxima2)
    let cell_proxima2 = document.createElement('td')
    cell_proxima2.id = "letra_sugestao"
    linha_proxima2.appendChild(cell_proxima2)

    let linha_proxima3 = document.createElement('tr')
    tabela_opcoes.append(linha_proxima3)
    let cell_proxima3 = document.createElement('td')
    cell_proxima3.id = "instrucao_preenchimento"
    linha_proxima3.appendChild(cell_proxima3)
    
    

    document.getElementById("div_central_adivinho").appendChild(tabela_opcoes)


    //Criar blanks
    let texto_html = '<td class="blanks_letras" id=""><button class="blanks"></button></td>'.repeat(resposta);
    document.getElementById("row_blanks_letras").innerHTML = texto_html;
    let largura = 100/resposta;
    document.getElementsByClassName("blanks_letras").style = "width:"+largura;
    document.getElementById("tabela_blanks").style = "width:"+resposta*5+"%";

    //Sempre que gerar novos blanks, significa que está começando uma nova radoda e é necessário fazer mais uma sugestão de letra
    gerar_letra_aleatoria();



    let botoes = Array.from(document.getElementsByClassName("blanks"));

    //Look que atribui a escuta da letra sorteada que aparecerá nos blanks
    if (botoes.length === 0) {
    
    } else {
        botoes.forEach(element => {

            element.addEventListener("click", function () {

                let letra_atual = letra_guess                
                
                if (letra_atual === "a") {

                    let numero_opcoes = 5;

                    document.getElementById("tabela_opcoes_vogais").style = "width: "+numero_opcoes*5+"%"

                    document.getElementById("row_opcoes_vogais").innerHTML = '<td class="td_opcoes"><button class="opcoes_vogais" id="a">a</button></td><td class="td_opcoes"><button class="opcoes_vogais" id="á">á</button></td><td class="td_opcoes"><button class="opcoes_vogais" id="ã">ã</button></td><td class="td_opcoes"><button class="opcoes_vogais" id="â">â</button></td><td class="td_opcoes"><button class="opcoes_vogais" id="à">à</button></td>'
                    
                    document.getElementsByClassName("td_opcoes").style = "width: "+100/numero_opcoes+"%"

                    let opcoes_a = Array.from(document.getElementsByClassName("opcoes_vogais"));
        
                    opcoes_a.forEach(opcao => {
                        
                        opcao.addEventListener("click", function() {
                            element.innerHTML = opcao.id.toString();
                                
                            letras_usadas += 1;
                            listar_possiveis_palavras();
                            document.getElementById("row_opcoes_vogais").innerHTML = ""
                            
                                
                        })
                    })
                
                    
                } else if (letra_atual === "e") {


                    let numero_opcoes = 3;

                    document.getElementById("tabela_opcoes_vogais").style = "width: "+numero_opcoes*5+"%"

                    
                    document.getElementById("row_opcoes_vogais").innerHTML = '<td class="td_opcoes"><button class="opcoes_vogais" id="e">e</button></td><td class="td_opcoes"><button class="opcoes_vogais" id="é">é</button></td><td class="td_opcoes"><button class="opcoes_vogais" id="ê">ê</button></td>'

                    document.getElementsByClassName("td_opcoes").style = "width: "+100/numero_opcoes+"%"
                    
                    let opcoes_a = Array.from(document.getElementsByClassName("opcoes_vogais"));
        
                    opcoes_a.forEach(opcao => {
                        opcao.addEventListener("click", function() {
                            element.innerHTML = opcao.id.toString();
                            letras_usadas += 1;
                            
                            listar_possiveis_palavras();
                            document.getElementById("row_opcoes_vogais").innerHTML = ""
                            
                        })
                    })
                
                    

                } else if (letra_atual === "i") {

                    let numero_opcoes = 2;

                    document.getElementById("tabela_opcoes_vogais").style = "width: "+numero_opcoes*5+"%"

                    
                    document.getElementById("row_opcoes_vogais").innerHTML = '<td class="td_opcoes"><button class="opcoes_vogais" id="i">i</button></td><td class="td_opcoes"><button class="opcoes_vogais" id="í">í</button></td>'
                    
                    document.getElementsByClassName("td_opcoes").style = "width: "+100/numero_opcoes+"%"

                    let opcoes_a = Array.from(document.getElementsByClassName("opcoes_vogais"));
        
                    opcoes_a.forEach(opcao => {
                        
                        opcao.addEventListener("click", function() {
                            element.innerHTML = opcao.id.toString();
                            letras_usadas += 1;
                            listar_possiveis_palavras();
                            document.getElementById("row_opcoes_vogais").innerHTML = ""
                            
                        })
                    })
                
                    

                } else if (letra_atual === "o") {

                    let numero_opcoes = 4;

                    document.getElementById("tabela_opcoes_vogais").style = "width: "+numero_opcoes*5+"%"

                    
                    document.getElementById("row_opcoes_vogais").innerHTML = '<td class="td_opcoes"><button class="opcoes_vogais" id="o">o</button></td><td class="td_opcoes"><button class="opcoes_vogais" id="ó">ó</button></td><td class="td_opcoes"><button class="opcoes_vogais" id="ô">ô</button></td><td class="td_opcoes"><button class="opcoes_vogais" id="õ">õ</button></td>'

                    document.getElementsByClassName("td_opcoes").style = "width: "+100/numero_opcoes+"%"
                    
                    let opcoes_a = Array.from(document.getElementsByClassName("opcoes_vogais"));
        
                    opcoes_a.forEach(opcao => {
                        
                        opcao.addEventListener("click", function() {
                            element.innerHTML = opcao.id.toString();
                            letras_usadas += 1;
                            listar_possiveis_palavras();
                            document.getElementById("row_opcoes_vogais").innerHTML = ""
                            
                        })
                    })
                
                } else if (letra_atual === "u") {
                
                    let numero_opcoes = 2;

                    document.getElementById("tabela_opcoes_vogais").style = "width: "+numero_opcoes*5+"%"

                    
                    document.getElementById("row_opcoes_vogais").innerHTML = '<td class="td_opcoes"><button class="opcoes_vogais" id="u">u</button></td><td class="td_opcoes"><button class="opcoes_vogais" id="ú">ú</button></td>'
                    
                    document.getElementsByClassName("td_opcoes").style = "width: "+100/numero_opcoes+"%"

                    let opcoes_a = Array.from(document.getElementsByClassName("opcoes_vogais"));
        
                    opcoes_a.forEach(opcao => {
                        
                        opcao.addEventListener("click", function() {
                            element.innerHTML = opcao.id.toString();
                            letras_usadas += 1;
                            listar_possiveis_palavras();
                            document.getElementById("row_opcoes_vogais").innerHTML = ""
                            
                        })
                    })
                
                    

                } else if (letra_atual === "c") {

                    let numero_opcoes = 2;

                    document.getElementById("tabela_opcoes_vogais").style = "width: "+numero_opcoes*5+"%"
                    
                    document.getElementById("row_opcoes_vogais").innerHTML = '<td class="td_opcoes"><button class="opcoes_vogais" id="c">c</button></td><td class="td_opcoes"><button class="opcoes_vogais" id="ç">ç</button></td>'

                    document.getElementsByClassName("td_opcoes").style = "width: "+100/numero_opcoes+"%"
                    
                    let opcoes_a = Array.from(document.getElementsByClassName("opcoes_vogais"));
        
                    opcoes_a.forEach(opcao => {
                        
                        opcao.addEventListener("click", function() {
                            element.innerHTML = opcao.id.toString();
                            letras_usadas += 1;
                            listar_possiveis_palavras();
                            document.getElementById("row_opcoes_vogais").innerHTML = ""
                            
                        })
                    })
                
                } else {

                    element.innerHTML = letra_guess;
                    
                    letras_usadas += 1;
                    listar_possiveis_palavras();
                }
                
                
            })
            })
    };

    //Gera lista das palavras com mesmo tamanho

    lista_mesmo_tamanho = [];

    let tamanho_palavra_pensada = Array.from(document.getElementsByClassName("blanks"));

    lista_raw.forEach(element => {

        if (element.length === tamanho_palavra_pensada.length) {
            lista_mesmo_tamanho.push(element)

        } else {

        }
    })

};


//////////
//////////
//Geradores de letras sugeridas
//Retorna letra a partir dos resultados possíveis
function gerar_letra_nao_aleatoria() {

    var total_letras = [];

    var em_branco = [];

    //Saber quais letras já estão nos blanks
    let get_blanks = Array.from(document.getElementsByClassName("blanks"));
    let palavra_intermediario = []
    get_blanks.forEach(element => {
        palavra_intermediario.push(element.innerHTML)

        if (element.innerHTML === '') {
            let qual_em_branco = get_blanks.indexOf(element);
            em_branco.push(qual_em_branco)
        }
    });


    //Popular lista de letras ainda possíveis
    possibilidades_palavras.forEach(element =>{

        let letras_elemento = element.split("", element.length)

        letras_elemento.forEach(abc => {

            if (em_branco.includes(letras_elemento.indexOf(abc)) && letras_descartadas.includes(abc) === false) {
                
                total_letras.push(abc)

            }
            
        })

    });

    if (total_letras.length > 0) {

        //Pega a letra mais frequente
        let nova_letra = mais_freq(total_letras)

        document.getElementById("letra_sugestao").innerText = "Letra: "+nova_letra.toUpperCase();
        document.getElementById("instrucao_preenchimento").innerHTML = "Clique onde está a letra "+nova_letra.toUpperCase();
        document.getElementById("cell_nao").innerHTML = '<button class="simnao" id="nao" onclick="nao()">sugerir outra letra</button>';

        letra_guess = nova_letra;

        document.getElementById("numero_letras_tentadas").innerHTML = "Letras sugeridas: "+letras_chutadas;

    } else {
        console.log("caiu aqui")
        document.getElementById("status").innerHTML = "Nenhuma palavra se encaixa nesse padrão!"
        document.getElementById("reboot").innerHTML = '<button id="reboot_button" onclick="botao_recomecar()">Recomeçar!</button>'
    }

}

//Gera uma letra aleatória para perguntar se está na palavra
function gerar_letra_aleatoria () {

    if (letras_usadas === 0) {

        var letras_inicio = ["a", "e", "i", "o", "u"];

        var letras = [];
        
        letras_inicio.forEach(element => {
            if (letras_descartadas.includes(element) === false) {
                letras.push(element)
            }
        })
        
        if (letras.length === 0) {

            document.getElementById("status").innerHTML = "Status: "
            document.getElementById("chute").innerHTML = "Não existe palavra sem vogal!"


            document.getElementById("reboot").innerHTML = '<button id="reboot_button">Recomeçar!</button>'
            //Função do botão Recomeçar
            let recomecar = document.getElementById("reboot_button")
            recomecar.addEventListener("click", function() {
                window.location.reload()
            })

        } else {
            let nova_letra = letras[Math.floor(Math.random() * letras.length)];

            document.getElementById("letra_sugestao").innerHTML = 'Letra: '+nova_letra.toUpperCase();
            document.getElementById("instrucao_preenchimento").innerHTML = "Clique onde está a letra "+nova_letra.toUpperCase();
            document.getElementById("cell_nao").innerHTML = '<button class="simnao" id="nao" onclick="nao()">sugerir outra letra</button>';

            letra_guess = nova_letra;

            //document.getElementById("numero_letras_tentadas").innerHTML = "Letras sugeridas: "+letras_chutadas;

            return nova_letra;
        }
        

    } else {

        var letras_inicio = ["b", "c", "ç", "d", "f", "g", "h", "j", "l", "m", "n", "p", "q", "r", "s", "t","v", "x", "z"];

        var letras = [];

        letras_inicio.forEach(element => {
            if (letras_descartadas.includes(element) === false) {
                letras.push(element)
            }
        })

        let nova_letra = letras[Math.floor(Math.random() * letras.length)];

        document.getElementById("letra_sugestao").innerText = "Letra: "+nova_letra.toUpperCase();
        document.getElementById("instrucao_preenchimento").innerHTML = "Clique onde está a letra "+nova_letra.toUpperCase();
        document.getElementById("cell_nao").innerHTML = '<button class="simnao" id="nao" onclick="nao()">sugerir outra letra</button>';

        letra_guess = nova_letra;


        //document.getElementById("texto_numero_letras_tentadas").innerHTML = "Letras chutadas: ";
        document.getElementById("numero_letras_tentadas").innerHTML = letras_chutadas;

        return nova_letra;
    }
    

}
////////
////////