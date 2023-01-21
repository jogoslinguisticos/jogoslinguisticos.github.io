
// Esc para limpar tudo
document.addEventListener('keydown', function(event){
    if(event.key === "Escape"){
        document.getElementById("input_conjugador").value = "";
        document.getElementById("eu").innerHTML = "";
        document.getElementById("tu").innerHTML = "";
        document.getElementById("ele").innerHTML = "";
        document.getElementById("nos").innerHTML = "";
        document.getElementById("vos").innerHTML = "";
        document.getElementById("eles").innerHTML = "";
        document.getElementById("input_conjugador").focus();

        document.getElementById("aviso").innerHTML = "&nbsp;";

        let pessoas = document.getElementsByClassName("pessoa");
            for (var i = 0; i < pessoas.length; i++) {
                let nome_pessoa = pessoas[i].title;
                pessoas[i].innerHTML = "<mark>"+nome_pessoa+"</mark>&nbsp;";
            };

    }
});

//Função preencher a saída

function preencher(info_json) {

    if (info_json["infinitivo"] === "") {

        document.getElementById("aviso").innerHTML = "Parece que você não escreveu um verbo ainda."

    } else {

        console.log(info_json)

        document.getElementById("aviso").innerHTML = "&nbsp;"

        document.getElementById("eu").innerHTML = info_json['1ps']
        document.getElementById("tu").innerHTML = info_json['2ps']
        document.getElementById("ele").innerHTML = info_json['3ps']
        document.getElementById("nos").innerHTML = info_json['1pp']
        document.getElementById("vos").innerHTML = info_json['2pp']
        document.getElementById("eles").innerHTML = info_json['3pp']

    };

};

//Funções de conjugação

//Presente do indicativo
function presente_ind(site) {

    var info_json = {}
    var entrada = ""

    info_json['modo'] = 'indicativo';
    info_json['tempo'] = 'presente';

    //Direcionamento de aplicações
    if (site === 1) {
        entrada = document.getElementById("input_conjugador").value.toLowerCase();

        document.getElementById("eu").innerHTML = "";
        document.getElementById("tu").innerHTML = "";
        document.getElementById("ele").innerHTML = "";
        document.getElementById("nos").innerHTML = "";
        document.getElementById("vos").innerHTML = "";
        document.getElementById("eles").innerHTML = "";

        info_json['infinitivo'] = entrada;

    } else if (site === 2) {
        entrada = verbos_regulares[Math.floor(Math.random() * verbos_regulares.length)];
        info_json['infinitivo'] = entrada;
    };

    // check se está na lista de irregulares
    if (verbos_irregulares.includes(entrada)) {

        if (site===1) {
            document.getElementById("aviso").innerHTML = "Ainda não trabalhamos com verbos irregulares!";
        };
        
        info_json['tipo'] = 'irregular';

    // check se está na lista dos defectivos
    } else if (verbos_defectivos.includes(entrada)) {

        if (site===1) {
            document.getElementById("aviso").innerHTML = "Ainda não trabalhamos com verbos defectivos!";
        };

        info_json['tipo'] = 'defectivo';

    // verbos regulares
    } else {

        info_json['tipo'] = 'regular';

        // cria o radical
        let radical = entrada.slice(0, -2);

        //Primeira conjugação
        if (entrada.slice(-2, -1) === "a") {

            info_json['conjugação'] = 'primeira';
            info_json['pronominal'] = 'não';

            info_json['1ps'] = radical+"o"
            info_json['2ps'] = radical+"as"
            info_json['3ps'] = radical+"a"
            info_json['1pp'] = radical+"amos"
            info_json['2pp'] = radical+"ais"
            info_json['3pp'] = radical+"am"

        //Primeira conjugação pronominal
        } else if (entrada.slice(-5) === "ar-se") {

            info_json['conjugação'] = 'primeira';
            info_json['pronominal'] = 'sim';

            info_json['1ps'] = radical.slice(0, -3)+"o-me"
            info_json['2ps'] = radical.slice(0, -3)+"as-te"
            info_json['3ps'] = radical.slice(0, -3)+"a-se"
            info_json['1pp'] = radical.slice(0, -3)+"amo-nos"
            info_json['2pp'] = radical.slice(0, -3)+"ais-vos"
            info_json['3pp'] = radical.slice(0, -3)+"am-se"
        
        //Segunda conjungação
        } else if (entrada.slice(-2, -1) === "e") {

            info_json['conjugação'] = 'segunda';
            info_json['pronominal'] = 'não';

            if (radical.slice(-1) === "c") {

                info_json['1ps'] = radical.slice(0, -1)+"ç"+"o"
                info_json['2ps'] = radical+"es";
                info_json['3ps'] = radical+"e";
                info_json['1pp'] = radical+"emos";
                info_json['2pp'] = radical+"eis";
                info_json['3pp'] = radical+"em";

            } else if (radical.slice(-1) === "g") {

                info_json['1ps'] = radical.slice(0, -1)+"j"+"o"
                info_json['2ps'] = radical+"es";
                info_json['3ps'] = radical+"e";
                info_json['1pp'] = radical+"emos";
                info_json['2pp'] = radical+"eis";
                info_json['3pp'] = radical+"em";

            } else if (radical.slice(-2) === "gu") {

                info_json['1ps'] = radical.slice(0, -2)+"g"+"o"
                info_json['2ps'] = radical+"es";
                info_json['3ps'] = radical+"e";
                info_json['1pp'] = radical+"emos";
                info_json['2pp'] = radical+"eis";
                info_json['3pp'] = radical+"em";
            
            } else {

                info_json['1ps'] = radical+"o";
                info_json['2ps'] = radical+"es";
                info_json['3ps'] = radical+"e";
                info_json['1pp'] = radical+"emos";
                info_json['2pp'] = radical+"eis";
                info_json['3pp'] = radical+"em";

            };

        //Segunda conjugação pronominal
        } else if (entrada.slice(-5) === "er-se") {

            info_json['conjugação'] = 'segunda';
            info_json['pronominal'] = 'sim';

            if (radical.slice(-4, -3) === "c") {

                info_json['1ps'] = radical.slice(0, -4)+"ç"+"o-me";
                info_json['2ps'] = radical.slice(0, -3)+"es-te";
                info_json['3ps'] = radical.slice(0, -3)+"e-se";
                info_json['1pp'] = radical.slice(0, -3)+"emo-nos";
                info_json['2pp'] = radical.slice(0, -3)+"ei-vos";
                info_json['3pp'] = radical.slice(0, -3)+"em-se";

            } else if (radical.slice(-4, -3) === "g") {

                info_json['1ps'] = radical.slice(0, -4)+"j"+"o-me";
                info_json['2ps'] = radical.slice(0, -3)+"es-te";
                info_json['3ps'] = radical.slice(0, -3)+"e-se";
                info_json['1pp'] = radical.slice(0, -3)+"emo-nos";
                info_json['2pp'] = radical.slice(0, -3)+"ei-vos";
                info_json['3pp'] = radical.slice(0, -3)+"em-se";

            } else if (radical.slice(-5, -3) === "gu") {

                info_json['1ps'] = radical.slice(0, -5)+"g"+"o-me";
                info_json['2ps'] = radical.slice(0, -3)+"es-te";
                info_json['3ps'] = radical.slice(0, -3)+"e-se";
                info_json['1pp'] = radical.slice(0, -3)+"emo-nos";
                info_json['2pp'] = radical.slice(0, -3)+"ei-vos";
                info_json['3pp'] = radical.slice(0, -3)+"em-se";
            
            } else {

                info_json['1ps'] = radical.slice(0, -3)+"o-me";
                info_json['2ps'] = radical.slice(0, -3)+"es-te";
                info_json['3ps'] = radical.slice(0, -3)+"e-se";
                info_json['1pp'] = radical.slice(0, -3)+"emo-nos";
                info_json['2pp'] = radical.slice(0, -3)+"ei-vos";
                info_json['3pp'] = radical.slice(0, -3)+"em-se";

            };

        //Terceira conjugação
        } else if (entrada.slice(-2, -1) === "i") {

            info_json['conjugação'] = 'terceira';
            info_json['pronominal'] = 'não';

            if (radical.slice(-1) === "c") {

                info_json['1ps'] = radical.slice(0, -1)+"ç"+"o";
                info_json['2ps'] = radical+"es";
                info_json['3ps'] = radical+"e";
                info_json['1pp'] = radical+"imos";
                info_json['2pp'] = radical+"is";
                info_json['3pp'] = radical+"em";

            } else if (radical.slice(-1) === "g") {

                info_json['1ps'] = radical.slice(0, -1)+"j"+"o";
                info_json['2ps'] = radical+"es";
                info_json['3ps'] = radical+"e";
                info_json['1pp'] = radical+"imos";
                info_json['2pp'] = radical+"is";
                info_json['3pp'] = radical+"em";

            } else if (radical.slice(-2) === "gu") {

                info_json['1ps'] = radical.slice(0, -2)+"g"+"o";
                info_json['2ps'] = radical+"es";
                info_json['3ps'] = radical+"e";
                info_json['1pp'] = radical+"imos";
                info_json['2pp'] = radical+"is";
                info_json['3pp'] = radical+"em";
            
            } else {

                info_json['1ps'] = radical+"o";
                info_json['2ps'] = radical+"es";
                info_json['3ps'] = radical+"e";
                info_json['1pp'] = radical+"imos";
                info_json['2pp'] = radical+"is";
                info_json['3pp'] = radical+"em";

            };

        //Terceira conjugação pronominal
        } else if (entrada.slice(-5) === "ir-se") {

            info_json['conjugação'] = 'terceira';
            info_json['pronominal'] = 'sim';

            if (radical.slice(-4, -3) === "c") {

                info_json['1ps'] = radical.slice(0, -4)+"ç"+"o-me";
                info_json['2ps'] = radical.slice(0, -3)+"es-te";
                info_json['3ps'] = radical.slice(0, -3)+"e-se";
                info_json['1pp'] = radical.slice(0, -3)+"imo-nos";
                info_json['2pp'] = radical.slice(0, -3)+"is-vos";
                info_json['3pp'] = radical.slice(0, -3)+"em-se";

            } else if (radical.slice(-4, -3) === "g") {

                info_json['1ps'] = radical.slice(0, -4)+"j"+"o-me";
                info_json['2ps'] = radical.slice(0, -3)+"es-te";
                info_json['3ps'] = radical.slice(0, -3)+"e-se";
                info_json['1pp'] = radical.slice(0, -3)+"imo-nos";
                info_json['2pp'] = radical.slice(0, -3)+"is-vos";
                info_json['3pp'] = radical.slice(0, -3)+"em-se";

            } else if (radical.slice(-5, -3) === "gu") {

                info_json['1ps'] = radical.slice(0, -5)+"g"+"o-me";
                info_json['2ps'] = radical.slice(0, -3)+"es-te";
                info_json['3ps'] = radical.slice(0, -3)+"e-se";
                info_json['1pp'] = radical.slice(0, -3)+"imo-nos";
                info_json['2pp'] = radical.slice(0, -3)+"is-vos";
                info_json['3pp'] = radical.slice(0, -3)+"em-se";
            
            } else {

                info_json['1ps'] = radical.slice(0, -3)+"o-me";
                info_json['2ps'] = radical.slice(0, -3)+"es-te";
                info_json['3ps'] = radical.slice(0, -3)+"e-se";
                info_json['1pp'] = radical.slice(0, -3)+"imo-nos";
                info_json['2pp'] = radical.slice(0, -3)+"is-vos";
                info_json['3pp'] = radical.slice(0, -3)+"em-se";

            };

        }

        if (site===1) {
            //Retorna os pronomes e limpa os resultados
            let pessoas = document.getElementsByClassName("pessoa");
            for (var i = 0; i < pessoas.length; i++) {
                let nome_pessoa = pessoas[i].title;
                pessoas[i].innerHTML = "<mark>"+nome_pessoa+"</mark>&nbsp;";
            };
        preencher(info_json);
        }
        
    }

    return info_json;

};

//Pretério imperfeito do indicativo
function pret_imperfeito_ind(site) {

    let info_json = {}
    let entrada = ""

    info_json['modo'] = 'indicativo';
    info_json['tempo'] = 'pretérito imperfeito';

    //Direcionamento de aplicações
    if (site === 1) {
        entrada = document.getElementById("input_conjugador").value.toLowerCase();

        document.getElementById("eu").innerHTML = "";
        document.getElementById("tu").innerHTML = "";
        document.getElementById("ele").innerHTML = "";
        document.getElementById("nos").innerHTML = "";
        document.getElementById("vos").innerHTML = "";
        document.getElementById("eles").innerHTML = "";

        info_json['infinitivo'] = entrada;

    } else if (site === 2) {
        entrada = verbos_regulares[Math.floor(Math.random() * verbos_regulares.length)];
        info_json['infinitivo'] = entrada;
    };

    // check se está na lista de irregulares
    if (verbos_irregulares.includes(entrada)) {

        if (site===1) {
            document.getElementById("aviso").innerHTML = "Ainda não trabalhamos com verbos irregulares!";
        };
        
        info_json['tipo'] = 'irregular';
    
    // check se está na lista dos defectivos
    } else if (verbos_defectivos.includes(entrada)) {

        if (site===1) {
            document.getElementById("aviso").innerHTML = "Ainda não trabalhamos com verbos defectivos!";
        };

        info_json['tipo'] = 'defectivo';
    
    // verbos regulares
    } else {

        info_json['tipo'] = 'regular';

        // cria o radical
        let radical = entrada.slice(0, -2);

        //Primeira conjugação
        if (entrada.slice(-2, -1) === "a") {

            info_json['conjugação'] = 'primeira';
            info_json['pronominal'] = 'não';

            info_json['1ps'] = radical+"ava"
            info_json['2ps'] = radical+"avas"
            info_json['3ps'] = radical+"ava"
            info_json['1pp'] = radical+"ávamos"
            info_json['2pp'] = radical+"áveis"
            info_json['3pp'] = radical+"avam"

        //Primeira conjugação pronominal
        } else if (entrada.slice(-5) === "ar-se") {

            info_json['conjugação'] = 'primeira';
            info_json['pronominal'] = 'sim';

            info_json['1ps'] = radical.slice(0, -3)+"ava-me"
            info_json['2ps'] = radical.slice(0, -3)+"avas-te"
            info_json['3ps'] = radical.slice(0, -3)+"ava-se"
            info_json['1pp'] = radical.slice(0, -3)+"ávamo-nos"
            info_json['2pp'] = radical.slice(0, -3)+"áveis-vos"
            info_json['3pp'] = radical.slice(0, -3)+"avam-se"

        //Segunda conjugação
        } else if (entrada.slice(-2, -1) === "e") {

            info_json['conjugação'] = 'segunda';
            info_json['pronominal'] = 'não';

            info_json['1ps'] = radical+"ia"
            info_json['2ps'] = radical+"ias"
            info_json['3ps'] = radical+"ia"
            info_json['1pp'] = radical+"íamos"
            info_json['2pp'] = radical+"íeis"
            info_json['3pp'] = radical+"iam"

        //Segunda conjugação pronominal
        } else if (entrada.slice(-5) === "er-se") {

            info_json['conjugação'] = 'segunda';
            info_json['pronominal'] = 'sim';

            info_json['1ps'] = radical.slice(0, -3)+"ia-me"
            info_json['2ps'] = radical.slice(0, -3)+"ias-te"
            info_json['3ps'] = radical.slice(0, -3)+"ia-se"
            info_json['1pp'] = radical.slice(0, -3)+"íamo-nos"
            info_json['2pp'] = radical.slice(0, -3)+"íeis-vos"
            info_json['3pp'] = radical.slice(0, -3)+"iam-se"

        //Terceira conjugação
        } else if (entrada.slice(-2, -1) === "i") {

            info_json['conjugação'] = 'terceira';
            info_json['pronominal'] = 'não';

            info_json['1ps'] = radical+"ia"
            info_json['2ps'] = radical+"ias"
            info_json['3ps'] = radical+"ia"
            info_json['1pp'] = radical+"íamos"
            info_json['2pp'] = radical+"íeis"
            info_json['3pp'] = radical+"iam"

        //Terceira conjugação pronominal
        } else if (entrada.slice(-5) === "ir-se") {

            info_json['conjugação'] = 'terceira';
            info_json['pronominal'] = 'sim';

            info_json['1ps'] = radical.slice(0, -3)+"ia-me"
            info_json['2ps'] = radical.slice(0, -3)+"ias-te"
            info_json['3ps'] = radical.slice(0, -3)+"ia-se"
            info_json['1pp'] = radical.slice(0, -3)+"íamo-nos"
            info_json['2pp'] = radical.slice(0, -3)+"íeis-vos"
            info_json['3pp'] = radical.slice(0, -3)+"iam-se"

        }

        if (site===1) {
            //Retorna os pronomes e limpa os resultados
            let pessoas = document.getElementsByClassName("pessoa");
            for (var i = 0; i < pessoas.length; i++) {
                let nome_pessoa = pessoas[i].title;
                pessoas[i].innerHTML = "<mark>"+nome_pessoa+"</mark>&nbsp;";
            };
        preencher(info_json);
        }

    };


    return info_json;

};

//Pretérito perfeito do indicativo
function pret_perfeito_ind(site) {

    let info_json = {}
    var entrada = ""

    info_json['modo'] = 'indicativo';
    info_json['tempo'] = 'pretérito perfeito';

    //Direcionamento de aplicações
    if (site === 1) {
        entrada = document.getElementById("input_conjugador").value.toLowerCase();

        document.getElementById("eu").innerHTML = "";
        document.getElementById("tu").innerHTML = "";
        document.getElementById("ele").innerHTML = "";
        document.getElementById("nos").innerHTML = "";
        document.getElementById("vos").innerHTML = "";
        document.getElementById("eles").innerHTML = "";

        info_json['infinitivo'] = entrada;

    } else if (site === 2) {
        entrada = verbos_regulares[Math.floor(Math.random() * verbos_regulares.length)];
        info_json['infinitivo'] = entrada;
    };

    // check se está na lista de irregulares
    if (verbos_irregulares.includes(entrada)) {

        if (site===1) {
            document.getElementById("aviso").innerHTML = "Ainda não trabalhamos com verbos irregulares!";
        };
        
        info_json['tipo'] = 'irregular';
    
    // check se está na lista dos defectivos
    } else if (verbos_defectivos.includes(entrada)) {

        if (site===1) {
            document.getElementById("aviso").innerHTML = "Ainda não trabalhamos com verbos defectivos!";
        };

        info_json['tipo'] = 'defectivo';
    
    // verbos regulares
    } else {

        info_json['tipo'] = 'regular';

        // cria o radical
        let radical = entrada.slice(0, -2);

        //Primeira conjugação
        if (entrada.slice(-2, -1) === "a") {

            info_json['conjugação'] = 'primeira'
            info_json['pronominal'] = 'não'

            if (radical.slice(-1) === "c") {

                info_json['1ps'] = radical.slice(0, -1)+"qu"+"ei";
                info_json['2ps'] = radical+"aste";
                info_json['3ps'] = radical+"ou";
                info_json['1pp'] = radical+"amos";
                info_json['2pp'] = radical+"astes";
                info_json['3pp'] = radical+"aram";

            } else if (radical.slice(-1) === "ç") {

                info_json['1ps'] = radical.slice(0, -1)+"c"+"ei";
                info_json['2ps'] = radical+"aste";
                info_json['3ps'] = radical+"ou";
                info_json['1pp'] = radical+"amos";
                info_json['2pp'] = radical+"astes";
                info_json['3pp'] = radical+"aram";

            } else if (radical.slice(-1) === "g") {

                info_json['1ps'] = radical.slice(0, -1)+"gu"+"ei";
                info_json['2ps'] = radical+"aste";
                info_json['3ps'] = radical+"ou";
                info_json['1pp'] = radical+"amos";
                info_json['2pp'] = radical+"astes";
                info_json['3pp'] = radical+"aram";

            } else {

                info_json['1ps'] = radical+"ei";
                info_json['2ps'] = radical+"aste";
                info_json['3ps'] = radical+"ou";
                info_json['1pp'] = radical+"amos";
                info_json['2pp'] = radical+"astes";
                info_json['3pp'] = radical+"aram";

            };
        
        //Primeira conjugação pronominal
        } else if (entrada.slice(-5) === "ar-se") {

            info_json['conjugação'] = 'primeira'
            info_json['pronominal'] = 'sim'

            if (radical.slice(-4, -3) === "c") {

                info_json['1ps'] = radical.slice(0, -4)+"qu"+"ei-me";
                info_json['2ps'] = radical.slice(0, -3)+"aste-te";
                info_json['3ps'] = radical.slice(0, -3)+"ou-se";
                info_json['1pp'] = radical.slice(0, -3)+"amo-nos";
                info_json['2pp'] = radical.slice(0, -3)+"astes-vos";
                info_json['3pp'] = radical.slice(0, -3)+"aram-se";

            } else if (radical.slice(-4, -3) === "ç") {

                info_json['1ps'] = radical.slice(0, -4)+"c"+"ei-me";
                info_json['2ps'] = radical.slice(0, -3)+"aste-te";
                info_json['3ps'] = radical.slice(0, -3)+"ou-se";
                info_json['1pp'] = radical.slice(0, -3)+"amo-nos";
                info_json['2pp'] = radical.slice(0, -3)+"astes-vos";
                info_json['3pp'] = radical.slice(0, -3)+"aram-se";

            } else if (radical.slice(-4, -3) === "g") {

                info_json['1ps'] = radical.slice(0, -4)+"gu"+"ei-me";
                info_json['2ps'] = radical.slice(0, -3)+"aste-te";
                info_json['3ps'] = radical.slice(0, -3)+"ou-se";
                info_json['1pp'] = radical.slice(0, -3)+"amo-nos";
                info_json['2pp'] = radical.slice(0, -3)+"astes-vos";
                info_json['3pp'] = radical.slice(0, -3)+"aram-se";
            
            } else {

                info_json['1ps'] = radical.slice(0, -3)+"ei-me";
                info_json['2ps'] = radical.slice(0, -3)+"aste-te";
                info_json['3ps'] = radical.slice(0, -3)+"ou-se";
                info_json['1pp'] = radical.slice(0, -3)+"amo-nos";
                info_json['2pp'] = radical.slice(0, -3)+"astes-vos";
                info_json['3pp'] = radical.slice(0, -3)+"aram-se";

            }

        //Segunda conjugação
        } else if (entrada.slice(-2, -1) === "e") {

            info_json['conjugação'] = 'segunda'
            info_json['pronominal'] = 'não'
            
            info_json['1ps'] = radical+"i";
            info_json['2ps'] = radical+"este";
            info_json['3ps'] = radical+"eu";
            info_json['1pp'] = radical+"emos";
            info_json['2pp'] = radical+"estes";
            info_json['3pp'] = radical+"eram";

        //Segunda conjugação pronominal
        } else if (entrada.slice(-5) === "er-se") {

            info_json['conjugação'] = 'segunda'
            info_json['pronominal'] = 'sim'

            info_json['1ps'] = radical.slice(0, -3)+"i-me";
            info_json['2ps'] = radical.slice(0, -3)+"este-te";
            info_json['3ps'] = radical.slice(0, -3)+"eu-se";
            info_json['1pp'] = radical.slice(0, -3)+"emo-nos"
            info_json['2pp'] = radical.slice(0, -3)+"este-vos";
            info_json['3pp'] = radical.slice(0, -3)+"eram-se";

        //Terceira conjugação
        } else if (entrada.slice(-2, -1) === "i") {

            info_json['conjugação'] = 'terceira'
            info_json['pronominal'] = 'não'

            info_json['1ps'] = radical+"i";
            info_json['2ps'] = radical+"iste";
            info_json['3ps'] = radical+"iu";
            info_json['1pp'] = radical+"imos";
            info_json['2pp'] = radical+"istes";
            info_json['3pp'] = radical+"iram";

        } else if (entrada.slice(-5) === "ir-se") {

            info_json['conjugação'] = 'terceira'
            info_json['pronominal'] = 'sim'

            info_json['1ps'] = radical.slice(0, -3)+"i-me";
            info_json['2ps'] = radical.slice(0, -3)+"iste-te";
            info_json['3ps'] = radical.slice(0, -3)+"iu-se";
            info_json['1pp'] = radical.slice(0, -3)+"imo-nos";
            info_json['2pp'] = radical.slice(0, -3)+"istes-vos";
            info_json['3pp'] = radical.slice(0, -3)+"iram-se";

        }

        if (site===1) {
            //Retorna os pronomes e limpa os resultados
            let pessoas = document.getElementsByClassName("pessoa");
            for (var i = 0; i < pessoas.length; i++) {
                let nome_pessoa = pessoas[i].title;
                pessoas[i].innerHTML = "<mark>"+nome_pessoa+"</mark>&nbsp;";
            };
        preencher(info_json);
        };

    };


    return info_json;

};

//Pretérito mais-que-perfeito do indicativo
function pret_maisque_ind(site) {

    let info_json = {}
    var entrada = ""

    info_json['modo'] = 'indicativo';
    info_json['tempo'] = 'pretérito mais-que-perfeito';

    //Direcionamento de aplicações
    if (site === 1) {
        entrada = document.getElementById("input_conjugador").value.toLowerCase();

        document.getElementById("eu").innerHTML = "";
        document.getElementById("tu").innerHTML = "";
        document.getElementById("ele").innerHTML = "";
        document.getElementById("nos").innerHTML = "";
        document.getElementById("vos").innerHTML = "";
        document.getElementById("eles").innerHTML = "";

        info_json['infinitivo'] = entrada;

    } else if (site === 2) {
        entrada = verbos_regulares[Math.floor(Math.random() * verbos_regulares.length)];
        info_json['infinitivo'] = entrada;
    };

    // check se está na lista de irregulares
    if (verbos_irregulares.includes(entrada)) {

        if (site===1) {
            document.getElementById("aviso").innerHTML = "Ainda não trabalhamos com verbos irregulares!";
        };
        
        info_json['tipo'] = 'irregular';

    // check se está na lista dos defectivos
    } else if (verbos_defectivos.includes(entrada)) {

        if (site===1) {
            document.getElementById("aviso").innerHTML = "Ainda não trabalhamos com verbos defectivos!";
        };

        info_json['tipo'] = 'defectivo';

    // verbos regulares
    } else {

        info_json['tipo'] = 'regular';

        // cria o radical
        let radical = entrada.slice(0, -2);

        //Primeira conjugação
        if (entrada.slice(-2, -1) === "a") {

            info_json['conjugação'] = 'primeira'
            info_json['pronominal'] = 'não'

            info_json['1ps'] = radical+"ara";
            info_json['2ps'] = radical+"aras";
            info_json['3ps'] = radical+"ara";
            info_json['1pp'] = radical+"áramos";
            info_json['2pp'] = radical+"áreis";
            info_json['3pp'] = radical+"aram";


        //Primeira conjugação pronominal
        } else if (entrada.slice(-5) === "ar-se") {

            info_json['conjugação'] = 'primeira'
            info_json['pronominal'] = 'sim'

            info_json['1ps'] = radical.slice(0, -3)+"ara-me";
            info_json['2ps'] = radical.slice(0, -3)+"aras-te";
            info_json['3ps'] = radical.slice(0, -3)+"ara-se";
            info_json['1pp'] = radical.slice(0, -3)+"áramo-nos";
            info_json['2pp'] = radical.slice(0, -3)+"áreis-vos";
            info_json['3pp'] = radical.slice(0, -3)+"aram-se";
        
        //Segunda conjugação
        } else if (entrada.slice(-2, -1) === "e") {

            info_json['conjugação'] = 'segunda'
            info_json['pronominal'] = 'não'

            info_json['1ps'] = radical+"era";
            info_json['2ps'] = radical+"eras";
            info_json['3ps'] = radical+"era";
            info_json['1pp'] = radical+"êramos";
            info_json['2pp'] = radical+"êreis";
            info_json['3pp'] = radical+"eram";

        //Segunda conjugação pronominal
        } else if (entrada.slice(-5) === "er-se") {

            info_json['conjugação'] = 'segunda'
            info_json['pronominal'] = 'sim'

            info_json['1ps'] = radical.slice(0, -3)+"era-me";
            info_json['2ps'] = radical.slice(0, -3)+"eras-te";
            info_json['3ps'] = radical.slice(0, -3)+"era-se";
            info_json['1pp'] = radical.slice(0, -3)+"êramo-nos";
            info_json['2pp'] = radical.slice(0, -3)+"êreis-vos";
            info_json['3pp'] = radical.slice(0, -3)+"eram-se";
        
        //Terceira conjugação
        } else if (entrada.slice(-2, -1) === "i") {

            info_json['conjugação'] = 'terceira'
            info_json['pronominal'] = 'não'

            info_json['1ps'] = radical+"ira";
            info_json['2ps'] = radical+"iras";
            info_json['3ps'] = radical+"ira";
            info_json['1pp'] = radical+"íramos";
            info_json['2pp'] = radical+"íreis";
            info_json['3pp'] = radical+"iram";

        //Terceira conjugação pronominal
        } else if (entrada.slice(-5) === "ir-se") {

            info_json['conjugação'] = 'terceira'
            info_json['pronominal'] = 'sim'

            info_json['1ps'] = radical.slice(0, -3)+"ira-me";
            info_json['2ps'] = radical.slice(0, -3)+"iras-te";
            info_json['3ps'] = radical.slice(0, -3)+"ira-se";
            info_json['1pp'] = radical.slice(0, -3)+"íramo-nos";
            info_json['2pp'] = radical.slice(0, -3)+"íreis-vos";
            info_json['3pp'] = radical.slice(0, -3)+"iram-se";

        }
        if (site===1) {
            //Retorna os pronomes e limpa os resultados
            let pessoas = document.getElementsByClassName("pessoa");
            for (var i = 0; i < pessoas.length; i++) {
                let nome_pessoa = pessoas[i].title;
                pessoas[i].innerHTML = "<mark>"+nome_pessoa+"</mark>&nbsp;";
            };
        preencher(info_json);
        }

    };

    return info_json;

};

//Futuro do presente do indicativo
function futuro_pres_ind(site) {

    let info_json = {}
    var entrada = ""

    info_json['modo'] = 'indicativo';
    info_json['tempo'] = 'futuro do presente';

    //Direcionamento de aplicações
    if (site === 1) {
        entrada = document.getElementById("input_conjugador").value.toLowerCase();

        document.getElementById("eu").innerHTML = "";
        document.getElementById("tu").innerHTML = "";
        document.getElementById("ele").innerHTML = "";
        document.getElementById("nos").innerHTML = "";
        document.getElementById("vos").innerHTML = "";
        document.getElementById("eles").innerHTML = "";

        info_json['infinitivo'] = entrada;

    } else if (site === 2) {
        entrada = verbos_regulares[Math.floor(Math.random() * verbos_regulares.length)];
        info_json['infinitivo'] = entrada;
    };

    // check se está na lista de irregulares
    if (verbos_irregulares.includes(entrada)) {

        if (site===1) {
            document.getElementById("aviso").innerHTML = "Ainda não trabalhamos com verbos irregulares!";
        };
        
        info_json['tipo'] = 'irregular';

    // check se está na lista dos defectivos
    } else if (verbos_defectivos.includes(entrada)) {

        if (site===1) {
            document.getElementById("aviso").innerHTML = "Ainda não trabalhamos com verbos defectivos!";
        };

        info_json['tipo'] = 'defectivo';

    // verbos regulares
    } else {

        info_json['tipo'] = 'regular';

        // cria o radical
        let radical = entrada.slice(0, -2);

        //Primeira conjugação
        if (entrada.slice(-2, -1) === "a") {

            info_json['conjugação'] = 'primeira'
            info_json['pronominal'] = 'não'

            info_json['1ps'] = radical+"arei";
            info_json['2ps'] = radical+"arás";
            info_json['3ps'] = radical+"ará";
            info_json['1pp'] = radical+"aremos";
            info_json['2pp'] = radical+"areis";
            info_json['3pp'] = radical+"arão";

        //Primeira conjugação pronominal
        } else if (entrada.slice(-5) === "ar-se") {

            info_json['conjugação'] = 'primeira'
            info_json['pronominal'] = 'sim'

            info_json['1ps'] = radical.slice(0, -3)+"ar-me-ei";
            info_json['2ps'] = radical.slice(0, -3)+"ar-te-ás";
            info_json['3ps'] = radical.slice(0, -3)+"ar-se-á";
            info_json['1pp'] = radical.slice(0, -3)+"ar-nos-emos";
            info_json['2pp'] = radical.slice(0, -3)+"ar-vos-eis";
            info_json['3pp'] = radical.slice(0, -3)+"ar-se-ão";
        
        //Segunda conjugação
        } else if (entrada.slice(-2, -1) === "e") {

            info_json['conjugação'] = 'segunda'
            info_json['pronominal'] = 'não'

            info_json['1ps'] = radical+"erei";
            info_json['2ps'] = radical+"erás";
            info_json['3ps'] = radical+"erá";
            info_json['1pp'] = radical+"eremos";
            info_json['2pp'] = radical+"ereis";
            info_json['3pp'] = radical+"erão";

        //Segunda conjugação pronominal
        } else if (entrada.slice(-5) === "er-se") {

            info_json['conjugação'] = 'segunda'
            info_json['pronominal'] = 'sim'

            info_json['1ps'] = radical.slice(0, -3)+"er-me-ei";
            info_json['2ps'] = radical.slice(0, -3)+"er-te-ás";
            info_json['3ps'] = radical.slice(0, -3)+"er-se-á";
            info_json['1pp'] = radical.slice(0, -3)+"er-nos-emos";
            info_json['2pp'] = radical.slice(0, -3)+"er-vos-eis";
            info_json['3pp'] = radical.slice(0, -3)+"er-se-ão";
        
        //Terceira conjugação
        } else if (entrada.slice(-2, -1) === "i") {

            info_json['conjugação'] = 'terceira'
            info_json['pronominal'] = 'não'

            info_json['1ps'] = radical+"irei";
            info_json['2ps'] = radical+"irás";
            info_json['3ps'] = radical+"irá";
            info_json['1pp'] = radical+"iremos";
            info_json['2pp'] = radical+"ireis";
            info_json['3pp'] = radical+"irão";

        //Terceira conjugação pronominal
        } else if (entrada.slice(-5) === "ir-se") {

            info_json['conjugação'] = 'terceira'
            info_json['pronominal'] = 'sim'

            info_json['1ps'] = radical.slice(0, -3)+"ir-me-ei";
            info_json['2ps'] = radical.slice(0, -3)+"ir-te-ás";
            info_json['3ps'] = radical.slice(0, -3)+"ir-se-á";
            info_json['1pp'] = radical.slice(0, -3)+"ir-nos-emos";
            info_json['2pp'] = radical.slice(0, -3)+"ir-vos-eis";
            info_json['3pp'] = radical.slice(0, -3)+"ir-se-ão";

        }

        if (site===1) {
            //Retorna os pronomes e limpa os resultados
            let pessoas = document.getElementsByClassName("pessoa");
            for (var i = 0; i < pessoas.length; i++) {
                let nome_pessoa = pessoas[i].title;
                pessoas[i].innerHTML = "<mark>"+nome_pessoa+"</mark>&nbsp;";
            };
        preencher(info_json);
        };

    };

    return info_json;

};

//Futuro do pretérito do indicativo
function futuro_pret_ind(site) {

    let info_json = {}
    var entrada = ""

    info_json['modo'] = 'indicativo';
    info_json['tempo'] = 'futuro do pretérito';

    //Direcionamento de aplicações
    if (site === 1) {
        entrada = document.getElementById("input_conjugador").value.toLowerCase();

        document.getElementById("eu").innerHTML = "";
        document.getElementById("tu").innerHTML = "";
        document.getElementById("ele").innerHTML = "";
        document.getElementById("nos").innerHTML = "";
        document.getElementById("vos").innerHTML = "";
        document.getElementById("eles").innerHTML = "";

        info_json['infinitivo'] = entrada;

    } else if (site === 2) {
        entrada = verbos_regulares[Math.floor(Math.random() * verbos_regulares.length)];
        info_json['infinitivo'] = entrada;
    };

    // check se está na lista de irregulares
    if (verbos_irregulares.includes(entrada)) {

        if (site===1) {
            document.getElementById("aviso").innerHTML = "Ainda não trabalhamos com verbos irregulares!";
        };
        
        info_json['tipo'] = 'irregular';

    // check se está na lista dos defectivos
    } else if (verbos_defectivos.includes(entrada)) {

        if (site===1) {
            document.getElementById("aviso").innerHTML = "Ainda não trabalhamos com verbos defectivos!";
        };

        info_json['tipo'] = 'defectivo';

    // verbos regulares
    } else {

        info_json['tipo'] = 'regular';

        // cria o radical
        let radical = entrada.slice(0, -2);

        //Primeira conjugação
        if (entrada.slice(-2, -1) === "a") {

            info_json['conjugação'] = 'primeira'
            info_json['pronominal'] = 'não'

            info_json['1ps'] = radical+"aria";
            info_json['2ps'] = radical+"arias";
            info_json['3ps'] = radical+"aria";
            info_json['1pp'] = radical+"aríamos";
            info_json['2pp'] = radical+"aríeis";
            info_json['3pp'] = radical+"ariam";

        //Primeira conjugação pronominal
        } else if (entrada.slice(-5) === "ar-se") {

            info_json['conjugação'] = 'primeira'
            info_json['pronominal'] = 'sim'

            info_json['1ps'] = radical.slice(0, -3)+"ar-me-ia";
            info_json['2ps'] = radical.slice(0, -3)+"ar-te-ias";
            info_json['3ps'] = radical.slice(0, -3)+"ar-se-ia";
            info_json['1pp'] = radical.slice(0, -3)+"ar-nos-íamos";
            info_json['2pp'] = radical.slice(0, -3)+"ar-vos-íeis";
            info_json['3pp'] = radical.slice(0, -3)+"ar-se-iam";

        //Segunda conjugação
        } else if (entrada.slice(-2, -1) === "e") {

            info_json['conjugação'] = 'segunda'
            info_json['pronominal'] = 'não'

            info_json['1ps'] = radical+"eria";
            info_json['2ps'] = radical+"erias";
            info_json['3ps'] = radical+"eria";
            info_json['1pp'] = radical+"eríamos";
            info_json['2pp'] = radical+"eríeis";
            info_json['3pp'] = radical+"eriam";

        //Segunda conjugação pronominal
        } else if (entrada.slice(-5) === "er-se") {

            info_json['conjugação'] = 'segunda'
            info_json['pronominal'] = 'sim'

            info_json['1ps'] = radical.slice(0, -3)+"er-me-ia";
            info_json['2ps'] = radical.slice(0, -3)+"er-te-ias";
            info_json['3ps'] = radical.slice(0, -3)+"er-se-ia";
            info_json['1pp'] = radical.slice(0, -3)+"er-nos-íamos";
            info_json['2pp'] = radical.slice(0, -3)+"er-vos-íeis";
            info_json['3pp'] = radical.slice(0, -3)+"er-se-iam";

        //Terceira conjugação
        } else if (entrada.slice(-2, -1) === "i") {

            info_json['conjugação'] = 'terceira'
            info_json['pronominal'] = 'não'

            info_json['1ps'] = radical+"iria";
            info_json['2ps'] = radical+"irias";
            info_json['3ps'] = radical+"iria";
            info_json['1pp'] = radical+"iríamos";
            info_json['2pp'] = radical+"iríeis";
            info_json['3pp'] = radical+"iriam";

        //Terceira conjugação pronominal
        } else if (entrada.slice(-5) === "ir-se") {

            info_json['conjugação'] = 'terceira'
            info_json['pronominal'] = 'sim'

            info_json['1ps'] = radical.slice(0, -3)+"ir-me-ia";
            info_json['2ps'] = radical.slice(0, -3)+"ir-te-ias";
            info_json['3ps'] = radical.slice(0, -3)+"ir-se-ia";
            info_json['1pp'] = radical.slice(0, -3)+"ir-nos-íamos";
            info_json['2pp'] = radical.slice(0, -3)+"ir-vos-íeis";
            info_json['3pp'] = radical.slice(0, -3)+"ir-se-iam";

        }

        if (site===1) {
            //Retorna os pronomes e limpa os resultados
            let pessoas = document.getElementsByClassName("pessoa");
            for (var i = 0; i < pessoas.length; i++) {
                let nome_pessoa = pessoas[i].title;
                pessoas[i].innerHTML = "<mark>"+nome_pessoa+"</mark>&nbsp;";
            };
        preencher(info_json);
        }

    };

    return info_json;

};

//Presente do subjuntivo
function presente_sub(site) {

    let info_json = {}
    var entrada = ""

    info_json['modo'] = 'subjuntivo';
    info_json['tempo'] = 'presente';

    //Direcionamento de aplicações
    if (site === 1) {
        entrada = document.getElementById("input_conjugador").value.toLowerCase();

        document.getElementById("eu").innerHTML = "";
        document.getElementById("tu").innerHTML = "";
        document.getElementById("ele").innerHTML = "";
        document.getElementById("nos").innerHTML = "";
        document.getElementById("vos").innerHTML = "";
        document.getElementById("eles").innerHTML = "";

        info_json['infinitivo'] = entrada;

    } else if (site === 2) {
        entrada = verbos_regulares[Math.floor(Math.random() * verbos_regulares.length)];
        info_json['infinitivo'] = entrada;
    };

    // check se está na lista de irregulares
    if (verbos_irregulares.includes(entrada)) {

        if (site===1) {
            document.getElementById("aviso").innerHTML = "Ainda não trabalhamos com verbos irregulares!";
        };
        
        info_json['tipo'] = 'irregular';

    // check se está na lista dos defectivos
    } else if (verbos_defectivos.includes(entrada)) {

        if (site===1) {
            document.getElementById("aviso").innerHTML = "Ainda não trabalhamos com verbos defectivos!";
        };

        info_json['tipo'] = 'defectivo';

    // verbos regulares
    } else {

        info_json['tipo'] = 'regular';

        // cria o radical
        let radical = entrada.slice(0, -2);

        //Primeira conjugação
        if (entrada.slice(-2, -1) === "a") {

            info_json['conjugação'] = 'primeira'
            info_json['pronominal'] = 'não'

            if (radical.slice(-1) === "c") {

                info_json['1ps'] = radical.slice(0, -1)+"qu"+"e";
                info_json['2ps'] = radical.slice(0, -1)+"qu"+"es";
                info_json['3ps'] = radical.slice(0, -1)+"qu"+"e";
                info_json['1pp'] = radical.slice(0, -1)+"qu"+"emos";
                info_json['2pp'] = radical.slice(0, -1)+"qu"+"eis";
                info_json['3pp'] = radical.slice(0, -1)+"qu"+"em";

            } else if (radical.slice(-1) === "ç") {

                info_json['1ps'] = radical.slice(0, -1)+"c"+"e";
                info_json['2ps'] = radical.slice(0, -1)+"c"+"es";
                info_json['3ps'] = radical.slice(0, -1)+"c"+"e";
                info_json['1pp'] = radical.slice(0, -1)+"c"+"emos";
                info_json['2pp'] = radical.slice(0, -1)+"c"+"eis";
                info_json['3pp'] = radical.slice(0, -1)+"c"+"em";

            } else if (radical.slice(-1) === "g") {

                info_json['1ps'] = radical.slice(0, -1)+"gu"+"e";
                info_json['2ps'] = radical.slice(0, -1)+"gu"+"es";
                info_json['3ps'] = radical.slice(0, -1)+"gu"+"e";
                info_json['1pp'] = radical.slice(0, -1)+"gu"+"emos";
                info_json['2pp'] = radical.slice(0, -1)+"gu"+"eis";
                info_json['3pp'] = radical.slice(0, -1)+"gu"+"em";

            } else {

                info_json['1ps'] = radical+"e";
                info_json['2ps'] = radical+"es";
                info_json['3ps'] = radical+"e";
                info_json['1pp'] = radical+"emos";
                info_json['2pp'] = radical+"eis";
                info_json['3pp'] = radical+"em";

            }

        //Primeira conjugação pronominal
        } else if (entrada.slice(-5) === "ar-se") {

            info_json['conjugação'] = 'primeira'
            info_json['pronominal'] = 'sim'

            if (radical.slice(-4, -3) === "c") {

                info_json['1ps'] = radical.slice(0, -4)+"qu"+"e-me";
                info_json['2ps'] = radical.slice(0, -4)+"qu"+"es-te";
                info_json['3ps'] = radical.slice(0, -4)+"qu"+"e-se";
                info_json['1pp'] = radical.slice(0, -4)+"qu"+"emo-nos";
                info_json['2pp'] = radical.slice(0, -4)+"qu"+"eis-vos";
                info_json['3pp'] = radical.slice(0, -4)+"qu"+"em-se";

            } else if (radical.slice(-4, -3) === "ç") {

                info_json['1ps'] = radical.slice(0, -4)+"c"+"e-me";
                info_json['2ps'] = radical.slice(0, -4)+"c"+"es-te";
                info_json['3ps'] = radical.slice(0, -4)+"c"+"e-se";
                info_json['1pp'] = radical.slice(0, -4)+"c"+"emo-nos";
                info_json['2pp'] = radical.slice(0, -4)+"c"+"eis-vos";
                info_json['3pp'] = radical.slice(0, -4)+"c"+"em-se";

            } else if (radical.slice(-4, -3) === "g") {

                info_json['1ps'] = radical.slice(0, -4)+"gu"+"e-me";
                info_json['2ps'] = radical.slice(0, -4)+"gu"+"es-te";
                info_json['3ps'] = radical.slice(0, -4)+"gu"+"e-se";
                info_json['1pp'] = radical.slice(0, -4)+"gu"+"emo-nos";
                info_json['2pp'] = radical.slice(0, -4)+"gu"+"eis-vos";
                info_json['3pp'] = radical.slice(0, -4)+"gu"+"em-se";
            
            } else {

                info_json['1ps'] = radical.slice(0, -3)+"e-me";
                info_json['2ps'] = radical.slice(0, -3)+"es-te";
                info_json['3ps'] = radical.slice(0, -3)+"e-se";
                info_json['1pp'] = radical.slice(0, -3)+"emo-nos";
                info_json['2pp'] = radical.slice(0, -3)+"eis-vos";
                info_json['3pp'] = radical.slice(0, -3)+"em-se";

            }

        //Segunda conjugação
        } else if (entrada.slice(-2, -1) === "e") {

            info_json['conjugação'] = 'segunda'
            info_json['pronominal'] = 'não'

            if (radical.slice(-1) === "c") {

                info_json['1ps'] = radical.slice(0, -1)+"ç"+"a";
                info_json['2ps'] = radical.slice(0, -1)+"ç"+"as";
                info_json['3ps'] = radical.slice(0, -1)+"ç"+"a";
                info_json['1pp'] = radical.slice(0, -1)+"ç"+"amos";
                info_json['2pp'] = radical.slice(0, -1)+"ç"+"ais";
                info_json['3pp'] = radical.slice(0, -1)+"ç"+"am";

            } else if (radical.slice(-1) === "g") {

                info_json['1ps'] = radical.slice(0, -1)+"j"+"a";
                info_json['2ps'] = radical.slice(0, -1)+"j"+"as";
                info_json['3ps'] = radical.slice(0, -1)+"j"+"a";
                info_json['1pp'] = radical.slice(0, -1)+"j"+"amos";
                info_json['2pp'] = radical.slice(0, -1)+"j"+"ais";
                info_json['3pp'] = radical.slice(0, -1)+"j"+"am";

            } else if (radical.slice(-2) === "gu") {

                info_json['1ps'] = radical.slice(0, -2)+"g"+"a";
                info_json['2ps'] = radical.slice(0, -2)+"g"+"as";
                info_json['3ps'] = radical.slice(0, -2)+"g"+"a";
                info_json['1pp'] = radical.slice(0, -2)+"g"+"amos";
                info_json['2pp'] = radical.slice(0, -2)+"g"+"ais";
                info_json['3pp'] = radical.slice(0, -2)+"g"+"am";
            
            } else {

                info_json['1ps'] = radical+"a";
                info_json['2ps'] = radical+"as";
                info_json['3ps'] = radical+"a";
                info_json['1pp'] = radical+"amos";
                info_json['2pp'] = radical+"ais";
                info_json['3pp'] = radical+"am";

            };

        //Segunda conjugação pronominal
        } else if (entrada.slice(-5) === "er-se") {

            info_json['conjugação'] = 'segunda'
            info_json['pronominal'] = 'sim'

            if (radical.slice(-4, -3) === "c") {

                info_json['1ps'] = radical.slice(0, -4)+"ç"+"a-me";
                info_json['2ps'] = radical.slice(0, -4)+"ç"+"as-te";
                info_json['3ps'] = radical.slice(0, -4)+"ç"+"a-se";
                info_json['1pp'] = radical.slice(0, -4)+"ç"+"amo-no";
                info_json['2pp'] = radical.slice(0, -4)+"ç"+"ais-vos";
                info_json['3pp'] = radical.slice(0, -4)+"ç"+"am-se";

            } else if (radical.slice(-4, -3) === "g") {

                info_json['1ps'] = radical.slice(0, -4)+"j"+"a-me";
                info_json['2ps'] = radical.slice(0, -4)+"j"+"as-te";
                info_json['3ps'] = radical.slice(0, -4)+"j"+"a-se";
                info_json['1pp'] = radical.slice(0, -4)+"j"+"amo-no";
                info_json['2pp'] = radical.slice(0, -4)+"j"+"ais-vos";
                info_json['3pp'] = radical.slice(0, -4)+"j"+"am-se";

            } else if (radical.slice(-5, -3) === "gu") {

                info_json['1ps'] = radical.slice(0, -5)+"g"+"a-me";
                info_json['2ps'] = radical.slice(0, -5)+"g"+"as-te";
                info_json['3ps'] = radical.slice(0, -5)+"g"+"a-se";
                info_json['1pp'] = radical.slice(0, -5)+"g"+"amo-nos";
                info_json['2pp'] = radical.slice(0, -5)+"g"+"ais-vos";
                info_json['3pp'] = radical.slice(0, -5)+"g"+"am-se";
            
            } else {

                info_json['1ps'] = radical.slice(0, -3)+"a-me";
                info_json['2ps'] = radical.slice(0, -3)+"as-te";
                info_json['3ps'] = radical.slice(0, -3)+"a-se";
                info_json['1pp'] = radical.slice(0, -3)+"amo-nos";
                info_json['2pp'] = radical.slice(0, -3)+"ais-vos";
                info_json['3pp'] = radical.slice(0, -3)+"am-se";

            }

        //Terceira conjugação
        } else if (entrada.slice(-2, -1) === "i") {

            info_json['conjugação'] = 'terceira'
            info_json['pronominal'] = 'não'

            if (radical.slice(-1) === "c") {

                info_json['1ps'] = radical.slice(0, -2)+"ç"+"a";
                info_json['2ps'] = radical.slice(0, -2)+"ç"+"as";
                info_json['3ps'] = radical.slice(0, -2)+"ç"+"a";
                info_json['1pp'] = radical.slice(0, -2)+"ç"+"amos"
                info_json['2pp'] = radical.slice(0, -2)+"ç"+"ais";
                info_json['3pp'] = radical.slice(0, -2)+"ç"+"am";

            } else if (radical.slice(-1) === "g") {

                info_json['1ps'] = radical.slice(0, -2)+"j"+"a";
                info_json['2ps'] = radical.slice(0, -2)+"j"+"as";
                info_json['3ps'] = radical.slice(0, -2)+"j"+"a";
                info_json['1pp'] = radical.slice(0, -2)+"j"+"amos"
                info_json['2pp'] = radical.slice(0, -2)+"j"+"ais";
                info_json['3pp'] = radical.slice(0, -2)+"j"+"am";

            } else if (radical.slice(-2) === "gu") {

                info_json['1ps'] = radical.slice(0, -2)+"g"+"a";
                info_json['2ps'] = radical.slice(0, -2)+"g"+"as";
                info_json['3ps'] = radical.slice(0, -2)+"g"+"a";
                info_json['1pp'] = radical.slice(0, -2)+"g"+"amos"
                info_json['2pp'] = radical.slice(0, -2)+"g"+"ais";
                info_json['3pp'] = radical.slice(0, -2)+"g"+"am";
            
            } else {

                info_json['1ps'] = radical+"a";
                info_json['2ps'] = radical+"as";
                info_json['3ps'] = radical+"a";
                info_json['1pp'] = radical+"amos";
                info_json['2pp'] = radical+"ais";
                info_json['3pp'] = radical+"am";

            };

        //Terceira conjugação pronominal
        } else if (entrada.slice(-5) === "ir-se") {

            info_json['conjugação'] = 'terceira'
            info_json['pronominal'] = 'sim'

            if (radical.slice(-4, -3) === "c") {

                info_json['1ps'] = radical.slice(0, -4)+"ç"+"a-me";
                info_json['2ps'] = radical.slice(0, -4)+"ç"+"as-te";
                info_json['3ps'] = radical.slice(0, -4)+"ç"+"a-se";
                info_json['1pp'] = radical.slice(0, -4)+"ç"+"amo-nos";
                info_json['2pp'] = radical.slice(0, -4)+"ç"+"ais-vos";
                info_json['3pp'] = radical.slice(0, -4)+"ç"+"am-se";

            } else if (radical.slice(-4, -3) === "g") {

                info_json['1ps'] = radical.slice(0, -4)+"j"+"a-me";
                info_json['2ps'] = radical.slice(0, -4)+"j"+"as-te";
                info_json['3ps'] = radical.slice(0, -4)+"j"+"a-se";
                info_json['1pp'] = radical.slice(0, -4)+"j"+"amo-nos";
                info_json['2pp'] = radical.slice(0, -4)+"j"+"ais-vos";
                info_json['3pp'] = radical.slice(0, -4)+"j"+"am-se";

            } else if (radical.slice(-5, -3) === "gu") {

                info_json['1ps'] = radical.slice(0, -5)+"g"+"a-me";
                info_json['2ps'] = radical.slice(0, -5)+"g"+"as-te";
                info_json['3ps'] = radical.slice(0, -5)+"g"+"a-se";
                info_json['1pp'] = radical.slice(0, -5)+"g"+"amo-nos";
                info_json['2pp'] = radical.slice(0, -5)+"g"+"ais-vos";
                info_json['3pp'] = radical.slice(0, -5)+"g"+"am-se";
            
            } else {

                info_json['1ps'] = radical.slice(0, -3)+"a-me";
                info_json['2ps'] = radical.slice(0, -3)+"as-te";
                info_json['3ps'] = radical.slice(0, -3)+"a-se";
                info_json['1pp'] = radical.slice(0, -3)+"amo-nos";
                info_json['2pp'] = radical.slice(0, -3)+"ais-vos";
                info_json['3pp'] = radical.slice(0, -3)+"am-se";

            }


        }
        if (site===1) {
            //Retorna os pronomes e limpa os resultados
            let pessoas = document.getElementsByClassName("pessoa");
            for (var i = 0; i < pessoas.length; i++) {
                let nome_pessoa = pessoas[i].title;
                pessoas[i].innerHTML = "que <mark>"+nome_pessoa+"</mark>&nbsp;";
            };
        preencher(info_json);
        }
        
    };

    return info_json;

};

//Pretérito imperfeito do subjuntivo
function pret_imperfeito_sub(site) {

    let info_json = {}
    var entrada = ""

    info_json['modo'] = 'subjuntivo';
    info_json['tempo'] = 'pretérito imperfeito';

    //Direcionamento de aplicações
    if (site === 1) {
        entrada = document.getElementById("input_conjugador").value.toLowerCase();

        document.getElementById("eu").innerHTML = "";
        document.getElementById("tu").innerHTML = "";
        document.getElementById("ele").innerHTML = "";
        document.getElementById("nos").innerHTML = "";
        document.getElementById("vos").innerHTML = "";
        document.getElementById("eles").innerHTML = "";

        info_json['infinitivo'] = entrada;

    } else if (site === 2) {
        entrada = verbos_regulares[Math.floor(Math.random() * verbos_regulares.length)];
        info_json['infinitivo'] = entrada;
    };

    // check se está na lista de irregulares
    if (verbos_irregulares.includes(entrada)) {

        if (site===1) {
            document.getElementById("aviso").innerHTML = "Ainda não trabalhamos com verbos irregulares!";
        };
        
        info_json['tipo'] = 'irregular';

    // check se está na lista dos defectivos
    } else if (verbos_defectivos.includes(entrada)) {

        if (site===1) {
            document.getElementById("aviso").innerHTML = "Ainda não trabalhamos com verbos defectivos!";
        };

        info_json['tipo'] = 'defectivo';

    // verbos regulares
    } else {

        info_json['tipo'] = 'regular';

        // cria o radical
        let radical = entrada.slice(0, -2);

        //Primeira conjugação
        if (entrada.slice(-2, -1) === "a") {

            info_json['conjugação'] = 'primeira'
            info_json['pronominal'] = 'não'

            info_json['1ps'] = radical+"asse";
            info_json['2ps'] = radical+"asses";
            info_json['3ps'] = radical+"asse";
            info_json['1pp'] = radical+"ássemos";
            info_json['2pp'] = radical+"ásseis";
            info_json['3pp'] = radical+"assem";

        //Primeira conjugação pronominal
        } else if (entrada.slice(-5) === "ar-se") {

            info_json['conjugação'] = 'primeira'
            info_json['pronominal'] = 'sim'

            info_json['1ps'] = radical.slice(0, -3)+"asse-me";
            info_json['2ps']= radical.slice(0, -3)+"asses-te";
            info_json['3ps'] = radical.slice(0, -3)+"asse-se";
            info_json['1pp'] = radical.slice(0, -3)+"ássemo-nos";
            info_json['2pp'] = radical.slice(0, -3)+"ásseis-vos";
            info_json['3pp'] = radical.slice(0, -3)+"assem-se";

        //Segunda conjugação
        } else if (entrada.slice(-2, -1) === "e") {

            info_json['conjugação'] = 'segunda'
            info_json['pronominal'] = 'não'

            info_json['1ps'] = radical+"esse";
            info_json['2ps'] = radical+"esses";
            info_json['3ps'] = radical+"esse";
            info_json['1pp'] = radical+"êssemos";
            info_json['2pp'] = radical+"êsseis";
            info_json['3pp'] = radical+"essem";

        //Segunda conjugação pronominal
        } else if (entrada.slice(-5) === "er-se") {

            info_json['conjugação'] = 'segunda'
            info_json['pronominal'] = 'sim'

            info_json['1ps'] = radical.slice(0, -3)+"esse-me";
            info_json['2ps'] = radical.slice(0, -3)+"esses-te";
            info_json['3ps'] = radical.slice(0, -3)+"esse-se";
            info_json['1pp'] = radical.slice(0, -3)+"êssemo-nos";
            info_json['2pp'] = radical.slice(0, -3)+"êsseis-vos";
            info_json['3pp'] = radical.slice(0, -3)+"essem-se";

        //Terceira conjugação
        } else if (entrada.slice(-2, -1) === "i") {

            info_json['conjugação'] = 'terceira'
            info_json['pronominal'] = 'não'

            info_json['1ps'] = radical+"isse";
            info_json['2ps'] = radical+"isses";
            info_json['3ps'] = radical+"isse";
            info_json['1pp'] = radical+"íssemos";
            info_json['2pp'] = radical+"ísseis";
            info_json['3pp'] = radical+"issem";

        //Terceira conjugação pronominal
        } else if (entrada.slice(-5) === "ir-se") {

            info_json['conjugação'] = 'terceira'
            info_json['pronominal'] = 'sim'

            info_json['1ps'] = radical.slice(0, -3)+"isse-me";
            info_json['2ps'] = radical.slice(0, -3)+"isses-te";
            info_json['3ps'] = radical.slice(0, -3)+"isse-se";
            info_json['1pp'] = radical.slice(0, -3)+"íssemo-nos";
            info_json['2pp'] = radical.slice(0, -3)+"ísseis-vos";
            info_json['3pp'] = radical.slice(0, -3)+"issem-se";

        }

        if (site===1) {
            //Retorna os pronomes e limpa os resultados
            let pessoas = document.getElementsByClassName("pessoa");
            for (var i = 0; i < pessoas.length; i++) {
                let nome_pessoa = pessoas[i].title;
                pessoas[i].innerHTML = "se <mark>"+nome_pessoa+"</mark>&nbsp;";
            };
        preencher(info_json);
        };

    };

    return info_json;

};

//Futuro do subjuntivo
function futuro_sub(site) {

    let info_json = {}
    var entrada = ""

    info_json['modo'] = 'subjuntivo';
    info_json['tempo'] = 'futuro';

    //Direcionamento de aplicações
    if (site === 1) {
        entrada = document.getElementById("input_conjugador").value.toLowerCase();

        document.getElementById("eu").innerHTML = "";
        document.getElementById("tu").innerHTML = "";
        document.getElementById("ele").innerHTML = "";
        document.getElementById("nos").innerHTML = "";
        document.getElementById("vos").innerHTML = "";
        document.getElementById("eles").innerHTML = "";

        info_json['infinitivo'] = entrada;

    } else if (site === 2) {
        entrada = verbos_regulares[Math.floor(Math.random() * verbos_regulares.length)];
        info_json['infinitivo'] = entrada;
    };

    // check se está na lista de irregulares
    if (verbos_irregulares.includes(entrada)) {

        if (site===1) {
            document.getElementById("aviso").innerHTML = "Ainda não trabalhamos com verbos irregulares!";
        };
        
        info_json['tipo'] = 'irregular';

    // check se está na lista dos defectivos
    } else if (verbos_defectivos.includes(entrada)) {

        if (site===1) {
            document.getElementById("aviso").innerHTML = "Ainda não trabalhamos com verbos defectivos!";
        };

        info_json['tipo'] = 'defectivo';

    // verbos regulares
    } else {

        info_json['tipo'] = 'regular';

        // cria o radical
        let radical = entrada.slice(0, -2);

        //Primeira conjugação
        if (entrada.slice(-2, -1) === "a") {

            info_json['conjugação'] = 'primeira'
            info_json['pronominal'] = 'não'

            info_json['1ps'] = radical+"ar";
            info_json['2ps'] = radical+"ares";
            info_json['3ps'] = radical+"ar";
            info_json['1pp'] = radical+"armos";
            info_json['2pp'] = radical+"ardes";
            info_json['3pp'] = radical+"arem";

        //Primeira conjugação pronominal
        } else if (entrada.slice(-5) === "ar-se") {

            info_json['conjugação'] = 'primeira'
            info_json['pronominal'] = 'sim'

            info_json['1ps'] = "me "+radical.slice(0, -3)+"ar";
            info_json['2ps'] = "te "+radical.slice(0, -3)+"ares";
            info_json['3ps'] = "se "+radical.slice(0, -3)+"ar";
            info_json['1pp'] = "nos "+radical.slice(0, -3)+"armos";
            info_json['2pp'] = "vos "+radical.slice(0, -3)+"ardes";
            info_json['3pp'] = "se "+radical.slice(0, -3)+"arem";

        //Segunda conjugação
        } else if (entrada.slice(-2, -1) === "e") {

            info_json['conjugação'] = 'segunda'
            info_json['pronominal'] = 'não'

            info_json['1ps'] = radical+"er";
            info_json['2ps'] = radical+"eres";
            info_json['3ps'] = radical+"er";
            info_json['1pp'] = radical+"ermos";
            info_json['2pp'] = radical+"erdes";
            info_json['3pp'] = radical+"erem";

        //Segunda conjugação pronominal
        } else if (entrada.slice(-5) === "er-se") {

            info_json['conjugação'] = 'segunda'
            info_json['pronominal'] = 'sim'
        
            info_json['1ps'] = "me "+radical.slice(0, -3)+"er";
            info_json['2ps'] = "te "+radical.slice(0, -3)+"eres";
            info_json['3ps'] = "se "+radical.slice(0, -3)+"er";
            info_json['1pp'] = "nos "+radical.slice(0, -3)+"ermos";
            info_json['2pp'] = "vos "+radical.slice(0, -3)+"erdes";
            info_json['3pp'] = "se "+radical.slice(0, -3)+"erem";

        //Terceira conjugação
        } else if (entrada.slice(-2, -1) === "i") {

            info_json['conjugação'] = 'terceira'
            info_json['pronominal'] = 'não'

            info_json['1ps'] = radical+"ir";
            info_json['2ps'] = radical+"ires";
            info_json['3ps'] = radical+"ir";
            info_json['1pp'] = radical+"irmos";
            info_json['2pp'] = radical+"irdes";
            info_json['3pp'] = radical+"irem";

        //Terceira conjugação pronominal
        } else if (entrada.slice(-5) === "ir-se") {

            info_json['conjugação'] = 'terceira'
            info_json['pronominal'] = 'sim'

            info_json['1ps'] = "me "+radical.slice(0, -3)+"ir";
            info_json['2ps'] = "te "+radical.slice(0, -3)+"ires";
            info_json['3ps'] = "se "+radical.slice(0, -3)+"ir";
            info_json['1pp'] = "nos "+radical.slice(0, -3)+"irmos";
            info_json['2pp'] = "vos "+radical.slice(0, -3)+"irdes";
            info_json['3pp'] = "se "+radical.slice(0, -3)+"irem";
            
        }
        if (site===1) {
            //Retorna os pronomes e limpa os resultados
            let pessoas = document.getElementsByClassName("pessoa");
            for (var i = 0; i < pessoas.length; i++) {
                let nome_pessoa = pessoas[i].title;
                pessoas[i].innerHTML = "quando <mark>"+nome_pessoa+"</mark>&nbsp;";
            };
        preencher(info_json);
        };

    };

    return info_json;

};

//Presente do imperativo positivo
function presente_imperat_positivo(site) {

    let info_json = {}
    var entrada = ""

    info_json['modo'] = 'imperativo';
    info_json['maneira'] = 'positivo';

    //Direcionamento de aplicações
    if (site === 1) {
        entrada = document.getElementById("input_conjugador").value.toLowerCase();

        document.getElementById("eu").innerHTML = "";
        document.getElementById("tu").innerHTML = "";
        document.getElementById("ele").innerHTML = "";
        document.getElementById("nos").innerHTML = "";
        document.getElementById("vos").innerHTML = "";
        document.getElementById("eles").innerHTML = "";

        info_json['infinitivo'] = entrada;

    } else if (site === 2) {
        entrada = verbos_regulares[Math.floor(Math.random() * verbos_regulares.length)];
        info_json['infinitivo'] = entrada;
    };

    // check se está na lista de irregulares
    if (verbos_irregulares.includes(entrada)) {

        if (site===1) {
            document.getElementById("aviso").innerHTML = "Ainda não trabalhamos com verbos irregulares!";
        };
        
        info_json['tipo'] = 'irregular';

    // check se está na lista dos defectivos
    } else if (verbos_defectivos.includes(entrada)) {

        if (site===1) {
            document.getElementById("aviso").innerHTML = "Ainda não trabalhamos com verbos defectivos!";
        };

        info_json['tipo'] = 'defectivo';

    // verbos regulares
    } else {

        info_json['tipo'] = 'regular';

        // cria o radical
        let radical = entrada.slice(0, -2);

        //Primeira conjugação
        if (entrada.slice(-2, -1) === "a") {

            info_json['conjugação'] = 'primeira'
            info_json['pronominal'] = 'não'

            info_json['1ps'] = "-";
            info_json['2ps'] = radical+"a tu";
            info_json['3ps'] = "-";
            info_json['1pp'] = "-";
            info_json['2pp'] = radical+"ai vós";
            info_json['3pp'] = "-";

        //Primeira conjugação pronominal
        } else if (entrada.slice(-5) === "ar-se") {

            info_json['conjugação'] = 'primeira'
            info_json['pronominal'] = 'sim'

            info_json['1ps'] = "-";
            info_json['2ps'] = radical.slice(0, -3)+"a-te tu";
            info_json['3ps'] = "-";
            info_json['1pp'] = "-";
            info_json['2pp'] = radical.slice(0, -3)+"ai-vos vós";
            info_json['3pp'] = "-";

        //Segunda conjugação
        } else if (entrada.slice(-2, -1) === "e") {

            info_json['conjugação'] = 'segunda'
            info_json['pronominal'] = 'não'

            info_json['1ps'] = "-";
            info_json['2ps'] = radical+"e tu";
            info_json['3ps'] = "-";
            info_json['1pp'] = "-";
            info_json['2pp'] = radical+"ei vós";
            info_json['3pp'] = "-";

        //Segunda conjugação pronominal
        } else if (entrada.slice(-5) === "er-se") {

            info_json['conjugação'] = 'segunda'
            info_json['pronominal'] = 'sim'

            info_json['1ps'] = "-";
            info_json['2ps'] = radical.slice(0, -3)+"e-te tu";
            info_json['3ps'] = "-";
            info_json['1pp'] = "-";
            info_json['2pp'] = radical.slice(0, -3)+"ei-vos vós";
            info_json['3pp'] = "-";

        //Terceira conjugação
        } else if (entrada.slice(-2, -1) === "i") {

            info_json['conjugação'] = 'terceira'
            info_json['pronominal'] = 'não'

            info_json['1ps'] = "-";
            info_json['2ps'] = radical+"e tu";
            info_json['3ps'] = "-";
            info_json['1pp'] = "-";
            info_json['2pp'] = radical+"i vós";
            info_json['3pp'] = "-";

        //Terceira conjugação pronominal
        } else if (entrada.slice(-5) === "ir-se") {

            info_json['conjugação'] = 'terceira'
            info_json['pronominal'] = 'sim'

            info_json['1ps'] = "-";
            info_json['2ps'] = radical.slice(0, -3)+"e-te tu";
            info_json['3ps'] = "-";
            info_json['1pp'] = "-";
            info_json['2pp'] = radical.slice(0, -3)+"i-vos vós";
            info_json['3pp'] = "-";

        }
        if (site===1) {
            //Retira os pronomes de antes dos verbos
            let pessoas = document.getElementsByClassName("pessoa");
            for (var i = 0; i < pessoas.length; i++) {
                pessoas[i].innerHTML = "&nbsp;";
            };
        preencher(info_json);
        }

    };

    return info_json;

};


//Presente do imperativo negativo
function presente_imperat_negativo(site) {

    let info_json = {}
    var entrada = ""

    info_json['modo'] = 'imperativo';
    info_json['maneira'] = 'negativo';

    //Direcionamento de aplicações
    if (site === 1) {
        entrada = document.getElementById("input_conjugador").value.toLowerCase();

        document.getElementById("eu").innerHTML = "";
        document.getElementById("tu").innerHTML = "";
        document.getElementById("ele").innerHTML = "";
        document.getElementById("nos").innerHTML = "";
        document.getElementById("vos").innerHTML = "";
        document.getElementById("eles").innerHTML = "";

        info_json['infinitivo'] = entrada;

    } else if (site === 2) {
        entrada = verbos_regulares[Math.floor(Math.random() * verbos_regulares.length)];
        info_json['infinitivo'] = entrada;
    };

    // check se está na lista de irregulares
    if (verbos_irregulares.includes(entrada)) {

        if (site===1) {
            document.getElementById("aviso").innerHTML = "Ainda não trabalhamos com verbos irregulares!";
        };
        
        info_json['tipo'] = 'irregular';

    // check se está na lista dos defectivos
    } else if (verbos_defectivos.includes(entrada)) {

        if (site===1) {
            document.getElementById("aviso").innerHTML = "Ainda não trabalhamos com verbos defectivos!";
        };

        info_json['tipo'] = 'defectivo';

    // verbos regulares
    } else {

        info_json['tipo'] = 'regular';

        // cria o radical
        let radical = entrada.slice(0, -2);

        //Primeira conjugação
        if (entrada.slice(-2, -1) === "a") {

            info_json['conjugação'] = 'primeira'
            info_json['pronominal'] = 'não'

            if (radical.slice(-1) === "c") {

                info_json['1ps'] = '-';
                info_json['2ps'] = radical.slice(0, -1)+"qu"+"es tu";
                info_json['3ps'] = '-'
                info_json['1pp'] = '-'
                info_json['2pp'] = radical.slice(0, -1)+"qu"+"eis vós";
                info_json['3pp'] = '-'

            } else if (radical.slice(-1) === "ç") {

                info_json['1ps'] = '-'
                info_json['2ps'] = radical.slice(0, -1)+"c"+"es tu";
                info_json['3ps'] = '-'
                info_json['1pp'] = '-'
                info_json['2pp'] = radical.slice(0, -1)+"c"+"eis vós";
                info_json['3pp'] = '-'

            } else if (radical.slice(-1) === "g") {

                info_json['1ps'] = '-'
                info_json['2ps'] = radical.slice(0, -1)+"gu"+"es";
                info_json['3ps'] = '-'
                info_json['1pp'] = '-'
                info_json['2pp'] = radical.slice(0, -1)+"gu"+"eis vós";
                info_json['3pp'] = '-'

            } else {

                info_json['1ps'] = "-";
                info_json['2ps'] = radical+"es tu";
                info_json['3ps'] = "-";
                info_json['1pp'] = "-";
                info_json['2pp'] = radical+"eis vós";
                info_json['3pp'] = "-";

            }

        //Primeira conjugação pronominal
        } else if (entrada.slice(-5) === "ar-se") {

            info_json['conjugação'] = 'primeira'
            info_json['pronominal'] = 'sim'

            if (radical.slice(-4, -3) === "c") {

                info_json['1ps'] = '-'
                info_json['2ps'] = radical.slice(0, -4)+"qu"+"es-te tu";
                info_json['3ps'] = '-'
                info_json['1pp'] = '-'
                info_json['2pp'] = radical.slice(0, -4)+"qu"+"eis-vos vós";
                info_json['3pp'] = '-'

            } else if (radical.slice(-4, -3) === "ç") {

                info_json['1ps'] = '-'
                info_json['2ps'] = radical.slice(0, -4)+"c"+"es-te tu";
                info_json['3ps'] = '-'
                info_json['1pp'] = '-'
                info_json['2pp'] = radical.slice(0, -4)+"c"+"eis-vos vós";
                info_json['3pp'] = '-'

            } else if (radical.slice(-4, -3) === "g") {

                info_json['1ps'] = '-'
                info_json['2ps'] = radical.slice(0, -4)+"gu"+"es-te tu";
                info_json['3ps'] = '-'
                info_json['1pp'] = '-'
                info_json['2pp'] = radical.slice(0, -4)+"gu"+"eis-vos vós";
                info_json['3pp'] = '-'
            
            } else {

                info_json['1ps'] = "-";
                info_json['2ps'] = radical.slice(0, -3)+"es-te tu";
                info_json['3ps'] = "-";
                info_json['1pp'] = "-";
                info_json['2pp'] = radical.slice(0, -3)+"eis-vos vós";
                info_json['3pp'] = "-";

            }

        //Segunda conjugação
        } else if (entrada.slice(-2, -1) === "e") {

            info_json['conjugação'] = 'segunda'
            info_json['pronominal'] = 'não'

            if (radical.slice(-1) === "c") {

                info_json['1ps'] = '-'
                info_json['2ps'] = radical.slice(0, -1)+"ç"+"as tu";
                info_json['3ps'] = '-'
                info_json['1pp'] = '-'
                info_json['2pp'] = radical.slice(0, -1)+"ç"+"ais vós";
                info_json['3pp'] = '-'

            } else if (radical.slice(-1) === "g") {

                info_json['1ps'] = '-'
                info_json['2ps'] = radical.slice(0, -1)+"j"+"as tu";
                info_json['3ps'] = '-'
                info_json['1pp'] = '-'
                info_json['2pp'] = radical.slice(0, -1)+"j"+"ais vós";
                info_json['3pp'] = '-'

            } else if (radical.slice(-2) === "gu") {

                info_json['1ps'] = '-'
                info_json['2ps'] = radical.slice(0, -2)+"g"+"as tu";
                info_json['3ps'] = '-'
                info_json['1pp'] = '-'
                info_json['2pp'] = radical.slice(0, -2)+"g"+"ais vós";
                info_json['3pp'] = '-'
            
            } else {

                info_json['1ps'] = "-";
                info_json['2ps'] = radical+"as tu";
                info_json['3ps'] = "-";
                info_json['1pp'] = "-";
                info_json['2pp'] = radical+"ais vós";
                info_json['3pp'] = "-";

            };

        //Segunda conjugação pronominal
        } else if (entrada.slice(-5) === "er-se") {

            info_json['conjugação'] = 'segunda'
            info_json['pronominal'] = 'sim'

            if (radical.slice(-4, -3) === "c") {

                info_json['1ps'] = '-'
                info_json['2ps'] = radical.slice(0, -4)+"ç"+"as-te tu";
                info_json['3ps'] = '-'
                info_json['1pp'] = '-'
                info_json['2pp'] = radical.slice(0, -4)+"ç"+"ais-vos vós";
                info_json['3pp'] = '-'

            } else if (radical.slice(-4, -3) === "g") {

                info_json['1ps'] = '-'
                info_json['2ps'] = radical.slice(0, -4)+"j"+"as-te tu";
                info_json['3ps'] = '-'
                info_json['1pp'] = '-'
                info_json['2pp'] = radical.slice(0, -4)+"j"+"ais-vos vós";
                info_json['3pp'] = '-'

            } else if (radical.slice(-5, -3) === "gu") {

                info_json['1ps'] = '-'
                info_json['2ps'] = radical.slice(0, -5)+"g"+"as-te tu";
                info_json['3ps'] = '-'
                info_json['1pp'] = '-'
                info_json['2pp'] = radical.slice(0, -5)+"g"+"ais-vos vós";
                info_json['3pp'] = '-'
            
            } else {

                info_json['1ps'] = "-";
                info_json['2ps'] = radical.slice(0, -3)+"ai-te tu";
                info_json['3ps'] = "-";
                info_json['1pp'] = "-";
                info_json['2pp'] = radical.slice(0, -3)+"ais-vos vós";
                info_json['3pp'] = "-";

            }

        //Terceira conjugação
        } else if (entrada.slice(-2, -1) === "i") {

            info_json['conjugação'] = 'terceira'
            info_json['pronominal'] = 'não'

            if (radical.slice(-1) === "c") {

                info_json['1ps'] = '-'
                info_json['2ps'] = radical.slice(0, -2)+"ç"+"as tu";
                info_json['3ps'] = '-'
                info_json['1pp'] = '-'
                info_json['2pp'] = radical.slice(0, -2)+"ç"+"ais vós";
                info_json['3pp'] = '-'

            } else if (radical.slice(-1) === "g") {

                info_json['1ps'] = '-'
                info_json['2ps'] = radical.slice(0, -2)+"j"+"as tu";
                info_json['3ps'] = '-'
                info_json['1pp'] = '-'
                info_json['2pp'] = radical.slice(0, -2)+"j"+"ais vós";
                info_json['3pp'] = '-'

            } else if (radical.slice(-2) === "gu") {

                info_json['1ps'] = '-'
                info_json['2ps'] = radical.slice(0, -2)+"g"+"as tu";
                info_json['3ps'] = '-'
                info_json['1pp'] = '-'
                info_json['2pp'] = radical.slice(0, -2)+"g"+"ais vós";
                info_json['3pp'] = '-'
            
            } else {

                info_json['1ps'] = "-";
                info_json['2ps'] = radical+"as tu";
                info_json['3ps'] = "-";
                info_json['1pp'] = "-";
                info_json['2pp'] = radical+"ais vós";
                info_json['3pp'] = "-";

            };


        //Terceira conjugação pronominal
        } else if (entrada.slice(-5) === "ir-se") {

            info_json['conjugação'] = 'terceira'
            info_json['pronominal'] = 'sim'
            
            if (radical.slice(-4, -3) === "c") {

                info_json['1ps'] = '-'
                info_json['2ps'] = radical.slice(0, -4)+"ç"+"as-te tu";
                info_json['3ps'] = '-'
                info_json['1pp'] = '-'
                info_json['2pp'] = radical.slice(0, -4)+"ç"+"ais-vos vós";
                info_json['3pp'] = '-'

            } else if (radical.slice(-4, -3) === "g") {

                info_json['1ps'] = '-'
                info_json['2ps'] = radical.slice(0, -4)+"j"+"as-te tu";
                info_json['3ps'] = '-'
                info_json['1pp'] = '-'
                info_json['2pp'] = radical.slice(0, -4)+"j"+"ais-vos vós";
                info_json['3pp'] = '-'

            } else if (radical.slice(-5, -3) === "gu") {

                info_json['1ps'] = '-'
                info_json['2ps'] = radical.slice(0, -5)+"g"+"as-te tu";
                info_json['3ps'] = '-'
                info_json['1pp'] = '-'
                info_json['2pp'] = radical.slice(0, -5)+"g"+"ais-vos vós";
                info_json['3pp'] = '-'
            
            } else {

                info_json['1ps'] = "-";
                info_json['2ps'] = radical.slice(0, -3)+"as-te tu";
                info_json['3ps'] = "-";
                info_json['1pp'] = "-";
                info_json['2pp'] = radical.slice(0, -3)+"ais-vos vós";
                info_json['3pp'] = "-";

            }

        }

        if (site===1) {
            //Retira os pronomes de antes dos verbos
            let pessoas = document.getElementsByClassName("pessoa");

            for (var i = 0; i < pessoas.length; i++) {

                if (pessoas[i].title === "tu" | pessoas[i].title === "vós") {
                    pessoas[i].innerHTML = "não&nbsp;";                
                } else {
                    pessoas[i].innerHTML = "&nbsp;";                
                }
                
            };
        preencher(info_json);
        };

    };

    return info_json

};


const verbos_irregulares = ["abster", "acudir", "adequar", "aderir", "adjazer", "advertir", "advir", "afazer", "aferir", "agredir", "ansiar", "antedar", "antepor", "antever", "apor", "aprazer", "apropinquar", "aspergir", "assentir", "ater", "atrair", "atribuir", "auferir", "autodestruir", "avir", "bem-dizer", "bem-fazer", "bem-querer", "bendizer", "benfazer", "benquerer", "buir", "bulir", "caber", "cair", "cerzir", "circumpor", "circunver", "cobrir", "compelir", "competir", "compor", "comprazer", "concernir", "concluir", "condizer", "conferir", "confugir", "conseguir", "consentir", "construir", "consumir", "conter", "contradizer", "contrafazer", "contrair", "contrapor", "contrapropor", "contravir", "convergir", "convir", "crer", "cuspir", "dar", "decompor", "deferir", "delinquir", "denegrir", "depor", "desafazer", "desaguar", "desapor", "desaprazer", "desavir", "descaber", "descobrir", "descompor", "descomprazer", "desconstruir", "desconvir", "descrer", "desdar", "desdizer", "desimpedir", "desimpor", "deslinguar", "desmedir", "desmentir", "desmobiliar", "despedir", "despir", "despolir", "despor", "desprazer", "desprecaver", "desprover", "desquerer", "dessaber", "destruir", "desvaler", "desver", "deter", "devir", "devenir", "diferir", "digerir", "disferir", "disperder", "dispor", "distrair", "divergir", "divertir", "dizer", "dormir", "embair", "emergir", "encobrir", "engolir", "entredizer", "entrefazer", "entreouvir", "entrepor", "entrequerer", "entrever", "entrevir", "entupir", "enxaguar", "enxerir", "equivaler", "escapulir", "esfazer", "estar", "estrear", "esvair", "expedir", "expelir", "explodir", "expor", "extrapor", "fazer", "ferir", "flectir", "fletir", "fotocompor", "fraguar", "frigir", "fugir", "gelifazer", "gerir", "haver", "idear", "imergir", "impedir", "impelir", "impor", "implodir", "incendiar", "indeferir", "indispor", "inferir", "influir", "inflectir", "ingerir", "insatisfazer", "inserir", "interdizer", "intermediar", "interpor", "interver", "intervir", "investir", "ir", "jazer", "justapor", "ler", "liquefazer", "maisquerer", "maldispor", "maldizer", "malfazer", "malinguar", "malparir", "malquerer", "manter", "mediar", "medir", "mentir", "minguar", "obter", "obvir", "odiar", "opor", "ouvir", "parir", "pedir", "perder", "perfazer", "perseguir", "persentir", "pleitear", "poder", "poer", "polir", "pospor", "pôr", "prazer", "predispor", "predizer", "preferir", "prepor", "pressentir", "pressupor", "preterir", "prevenir", "prever", "proferir", "progredir", "propor", "prosseguir", "prossupor", "prover", "provir", "pruir", "puir", "putrefazer", "querer", "raer", "rarefazer", "readequar", "reaver", "reavir", "recobrir", "recompor", "reconvir", "redar", "redispor", "redizer", "reexpedir", "reexpor", "refazer", "referir", "refletir", "refugir", "regredir", "reimpor", "reindispor", "reinserir", "reler", "remediar", "remedir", "reobter", "reouvir", "repedir", "repelir", "repetir", "repor", "repropor", "requerer", "resfolegar", "ressentir", "reter", "retrair", "retranspor", "rever", "revestir", "revir", "rir", "ruir", "saber", "sacudir", "sair", "santiguar", "satisfazer", "seguir", "sentir", "ser", "servir", "sobpor", "sobre-expor", "sobreexpor", "sobrepor", "sobrestar", "sobrevir", "sorrir", "sortear", "sortir", "sotopor", "subir", "submergir", "subpor", "subsumir", "subtrair", "sugerir", "sumir", "superexpor", "superimpor", "superpor", "supor", "suster", "telever", "ter", "torrefazer", "tossir", "trair", "transfazer", "transferir", "transfugir", "transgredir", "transpor", "traspor", "trazer", "treler", "tresler", "trespor", "tumefazer", "valer", "ver", "vestir", "vir"]

const verbos_defectivos = ['abolir', 'aborrir', 'acupremir', 'adir', 'aducir', 'adurir', 'aguerrir', 'alvorecer', 'anadir', 'anhadir', 'anoitecer', 'aprazer', 'asir', 'aturdir', 'bagear', 'barroar', 'banir', 'barrir', 'bramir', 'brandir', 'branquir', 'buir', 'burburejar', 'cacarejar', 'carpir', 'chover', 'chuviscar', 'cocoricar', 'colorir', 'combalir', 'comburir', 'comedir', 'comedir-se', 'concernir', 'condir', 'condoer', 'crisalidar', 'cucuritar', 'delinquir', 'delir', 'deluzir', 'demolir', 'demulcir', 'desaborrir', 'desaprazer', 'desasir', 'descolorir', 'descomedir', 'desempedernir', 'desgornir', 'despavorir', 'desprazer', 'detergir', 'doer', 'ebulir', 'eclodir', 'embair', 'emolir', 'empedernir', 'empipocar', 'empirrear', 'enfrutar', 'engraecer', 'entardecer', 'esbaforir', 'escarnir', 'escucir-se', 'espargir', 'espavorir', 'espocar', 'estanguir', 'estresir', 'estrelejar', 'exaurir', 'excelir', 'exinanir', 'exir', 'explodir', 'extorquir', 'falir', 'feder', 'florir', 'foragir', 'foragir-se', 'fornir', 'florescer', 'fremer', 'fremir', 'fretenir', 'fulgir', 'ganir', 'ganiçar', 'garnir', 'garrir', 'garoar', 'gear', 'gornir', 'grassar', 'grunhir', 'grugulejar', 'gualdir', 'guarnir', 'haurir', 'impingir', 'inanir', 'jungir', 'ladrar', 'lampadejar', 'languir', 'latir', 'later', 'lenir', 'liquescer', 'manutenir', 'maticar', 'miar', 'monir ', 'moquir ', 'mosquir', 'mugir', 'nevar', 'neviscar', 'nevoar', 'nitrir', 'piar', 'penujar', 'pertransir', 'prazer', 'precaver', 'precluir', 'prefulgir', 'premir', 'pirilampar', 'pirilampear', 'pirilampejar', 'pororocar', 'preluzir', 'prurir', 'pruir', 'puir', 'reaver', 'recolorir', 'reflorir', 'refulgir', 'relampadear', 'relampadejar', 'relampaguear', 'relampear', 'relampejar', 'relinquir', 'relinchar', 'relir', 'relvejar', 'remir', 'renhir', 'repruir', 'ressarcir', 'ressequir', 'restrugir', 'retorquir', 'retransir', 'reverdejar', 'revelir', 'ruir', 'rugir', 'soer', 'susquir', 'tinir', 'tiquetaquear', 'transir', 'tremeluzir', 'trinir', 'trovejar', 'trovoar', 'vagear', 'ventar', 'verdejar', 'verminar', 'vagir']