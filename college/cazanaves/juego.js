import {Nivel, Uno, Dos, Tres, Cuatro, Cinco, Seis , Siete } from "./niveles.js";

class Juego {
    static messages;
    static levels;
    static score;
    static currentLevel;

    constructor() {
        // this.bichos=null; //Comentado porque Los almaceno en su nivel correspondiente
        Juego.Score = 0;
        Juego.messages = [];
        this.creaMensajes();
        Juego.levels = [];
        this.creaNiveles();
        // this.creaMensajeNiveles(); //Comentado porque creo este menú cuando puso start
        this.welcome();
        this.sounds;

    }
    welcome() {
        //creo los div para elmenu y agrego contenido en él y lo agrego al documento;
        this.fmenu = document.createElement("div");
        this.m = document.createElement("div");
        this.fmenu.id = "menulayer";
        this.m.id = "menu";
        document.body.appendChild(this.fmenu);
        this.fmenu.appendChild(this.m);
        this.m.appendChild(Juego.messages[0]);
        this.m.appendChild(Juego.messages[1]);

        Juego.messages[1].addEventListener("click", this.starGame);
    }

    creaMensajes() {

        //creo las etiquetas para cada mensaje
        var mtg = document.createElement("div");
        var mts = document.createElement("div");
        var mtn = document.createElement("div");
        mtg.id = "titleGame";
        mts.id = "titleStart";
        mtn.id = "titleMenu";

        //añado texto
        mtg.appendChild(document.createTextNode("¡Evita la invasión!"/*"¡A la caza del espacio!"*/));
        mts.appendChild(document.createTextNode("Pulse para iniciar el juego"));
        mtn.appendChild(document.createTextNode("Seleccione Nivel"));
        Juego.messages[0] = mtg;
        Juego.messages[1] = mts;
        Juego.messages[2] = mtn;

        //TODO Creo etiquetas para menú reset pausa y opciones 
        var menuSettings = document.createElement("div");
        menuSettings.id = "menuSetting";
        Juego.messages[5] = menuSettings;

        var cerrar = document.createElement("div");
        cerrar.appendChild(document.createTextNode("x"));
        var reset = document.createElement("div");
        var resetIcon = document.createElement("div");
        var resetText = document.createElement("div");
        reset.appendChild(resetIcon);
        reset.appendChild(resetText);
        resetText.appendChild(document.createTextNode("Reiniciar Nivel"))
        var levels = document.createElement("div");
        var levelsIcon = document.createElement("div");
        var levelsText = document.createElement("div");
        levels.appendChild(levelsIcon);
        levels.appendChild(levelsText);
        levelsText.appendChild(document.createTextNode("Seleccionar Niveles"))
        cerrar.id = "cerrarSettings";
        menuSettings.appendChild(cerrar);
        menuSettings.appendChild(reset);
        menuSettings.appendChild(levels);




        //creo div/boton para pausa, reset y opciones        
        var setting = document.createElement("div");
        setting.id = "buttonSetting";
        Juego.messages[6] = setting;



        cerrar.onclick = () => {
            document.getElementById("menulayer").style = "visibility:hidden";
            document.body.appendChild(Juego.messages[6]);
            //mostrar boton setting
            var friends = Juego.CurrentLevel.Amigos;
            for (let i = 0; i < friends.length; i++) {
                if (friends[i] != undefined) friends[i].Etiqueta.style.animationPlayState = "running";
            }
            var evils = Juego.CurrentLevel.Bichos;
            for (let i = 0; i < evils.length; i++) {
                if (evils[i] != undefined) evils[i].Etiqueta.style.animationPlayState = "running";
            }
        };

        reset.onclick = () => {
            Juego.resetLevel();
        };
        levels.onclick = () => {
            Juego.cleanNode(document.getElementById("menu"));
            Juego.cleanGame();
            Juego.showLevels(0);
        };
        setting.onclick = () => {
            //pausar las animaciones
            //quito boton settings
            //agregar a menú reset o mostrar niveles

            document.getElementById("menulayer").style = "visibility:visible";
            document.body.removeChild(Juego.messages[6]);
            document.getElementById("menu").appendChild(Juego.messages[5])

            Juego.pausaBichos();
        };

        //creo etiqueta para puntos
        var score = document.createElement("div");
        score.id = "bockScore";
        var scoreValue = document.createElement("div");
        scoreValue.id = "scoreValue"
        score.appendChild(document.createTextNode("Puntos: "));
        score.appendChild(scoreValue);
        scoreValue.appendChild(document.createTextNode("0"));
        Juego.messages[7] = score;

        var mensajePierdesAmigo = document.createElement("div");
        var text = document.createTextNode("!OH, NO! HAS MATADO A UNA NAVE HUMANA");
        mensajePierdesAmigo.appendChild(text);
        mensajePierdesAmigo.id="mensajePierdesAmigo";
        mensajePierdesAmigo.className="mensajesFinales";
        Juego.messages[8]=mensajePierdesAmigo;
        mensajePierdesAmigo.onclick=()=>{
            document.getElementById("menulayer").style = "visibility:visible";
            document.body.removeChild(Juego.messages[6]);
            document.body.removeChild(Juego.messages[8]);
            document.getElementById("menu").appendChild(Juego.messages[5])
            Juego.pausaBichos();
        }

        var mensajePierdesUFO = document.createElement("div");
        var text = document.createTextNode("GAME OVER.\n\r!HAS DEJADO QUE LOS EXTRATERRESTRES NOS INVADAN¡");
        mensajePierdesUFO.appendChild(text);
        mensajePierdesUFO.id="mensajePierdesUFO";
        mensajePierdesUFO.className="mensajesFinales";
        Juego.messages[9]=mensajePierdesUFO;
        mensajePierdesUFO.onclick=()=>{
            document.getElementById("menulayer").style = "visibility:visible";
            document.body.removeChild(Juego.messages[6]);
            document.body.removeChild(Juego.messages[9]);
            document.getElementById("menu").appendChild(Juego.messages[5])
            Juego.pausaBichos();
        }

        var mensajeGanas = document.createElement("div");
        var text = document.createTextNode("Nivel superado");
        mensajeGanas.appendChild(text);
        mensajeGanas.id="mensajeGanas";
        mensajeGanas.className="mensajesFinales";
        Juego.messages[10]=mensajeGanas;
        // mensajeGanas.onclick=()=>{
        //     var nivelactual = Juego.currentLevel.id;
        //     Juego.cleanGame()
        //     Juego.startLevel(Juego.levels[nivelactual])
        // }

    }
    creaNiveles(numNiveles) {
        Juego.levels[0] = new Uno();
        Juego.levels[1] = new Dos();
        Juego.levels[2] = new Tres();
        Juego.levels[3] = new Cuatro();
        Juego.levels[4] = new Cinco();
        Juego.levels[5] = new Seis();
        Juego.levels[6] = new Siete();
        // Juego.levels[8]=new Seis();
        // Juego.levels[9]=new Seis();
        // Juego.levels[10]=new Seis();
        // Juego.levels[11]=new Seis();
        // Juego.levels[12]=new Seis();
        // Juego.levels[13]=new Seis();


    }
    static creaMensajesNiveles() {
        /*var tb = document.createElement("table");
        var tr1 = document.createElement("tr");
        var tr2 = document.createElement("tr");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");        
        var td3 = document.createElement("td");        
        var td4 = document.createElement("td");        
        var td5 = document.createElement("td");        
        var td6 = document.createElement("td");*/

        var tb = document.createElement("div");
        var tr1 = document.createElement("div");
        var tr2 = document.createElement("div");
        var td1 = document.createElement("div");
        var td2 = document.createElement("div");
        var td3 = document.createElement("div");
        var td4 = document.createElement("div");
        var td5 = document.createElement("div");
        var td6 = document.createElement("div");

        tb.id = "selectNivel";
        Juego.messages[3] = tb;

        tb.appendChild(tr1);
        tb.appendChild(tr2);
        tr1.appendChild(td1);
        tr1.appendChild(td2);
        tr1.appendChild(td3);
        tr2.appendChild(td4);
        tr2.appendChild(td5);
        tr2.appendChild(td6);


        td1.onclick = Juego.startLevel;
        td2.onclick = Juego.startLevel;
        td3.onclick = Juego.startLevel;
        td4.onclick = Juego.startLevel;
        td5.onclick = Juego.startLevel;
        td6.onclick = Juego.startLevel;

        //fechas bajo los niveles
        var fblock = document.createElement("div");
        var flecha1 = document.createElement("div");
        var flecha2 = document.createElement("div");
        flecha1.appendChild(document.createTextNode("<"));//→← 
        flecha2.appendChild(document.createTextNode(">"));
        fblock.appendChild(flecha1);
        fblock.appendChild(flecha2);
        Juego.messages[4] = fblock;
        fblock.id = "fblock";
        flecha1.id = "flecha1";
        flecha2.id = "flecha2";
        flecha1.onclick = Juego.showLevels;
        flecha2.onclick = Juego.showLevels;
    }
    resize() {
    }
    showMessages() {
    }
    starGame() {
        Juego.cleanNode(document.getElementById("menu"));
        Juego.creaMensajesNiveles();
        Juego.showLevels(0);
    }
    static startLevel(nivelAJugar) {
        if (nivelAJugar instanceof Nivel) {
        var nivel = nivelAJugar
        }
        else {
        var nivel = this.id;
        nivel = nivel.replace("Nivel ", "");
        nivel = Number(nivel);
        nivel = Juego.levels[nivel - 1];
        }
        Juego.CurrentLevel = nivel;
        document.getElementById("menulayer").style = "visibility:hidden";//oculto la capa menu y limpio el div menu para la proxima vez que me haga falta
        Juego.cleanNode(document.getElementById("menu"));
        nivel.startLevel();
        document.body.appendChild(Juego.messages[7]); //agrego la etiqueta de puntuaciones
        document.body.appendChild(Juego.messages[6]); //agrego boton config 
        console.log(Juego.CurrentLevel.Bichos)
    }
    static cleanNode(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }
    static showLevels(num) {
        if (num != 0) { //distingo si llego desde stargame o menu configuración o pq he pulsado para mostar más niveles
            if (this.id == "flecha2") num = this.value;
            if (this.id == "flecha1") num = document.getElementById("flecha2").value - 12;
        }
        // Juego.cleanNode(menu); 
        menu.appendChild(Juego.messages[2])  //TODO Preguntar por qué puedo acceder directamente


        let tbLevels = Juego.messages[3];
        let tr1Levels = tbLevels.childNodes[0];
        let tr2Levels = tbLevels.childNodes[1];
        for (let i of tr1Levels.childNodes) {
            try {
                i.removeChild(i.firstChild); //quito el texto previo. Si no lo hay por estar los label recien creados capturo excepción
            } catch (error) {
            }
            try {
                i.appendChild(document.createTextNode(Juego.levels[num].Name));
                i.id = Juego.levels[num].Name;
            } catch (error) {
                //i.//TODO poner style visibilidad a hidden
            }
            num++;
        }
        for (let i of tr2Levels.childNodes) {
            try {
                i.removeChild(i.firstChild);
            } catch (error) {
            }
            try {
                i.appendChild(document.createTextNode(Juego.levels[num].Name));
                i.id = Juego.levels[num].Name;
            } catch (error) {
            }
            num++;
        }

        menu.appendChild(Juego.messages[3])

        Juego.messages[4].lastChild.value = num;//TODO poner mejor el valor del primer elemento principio
        Juego.messages[4].firstChild.style = "visibility:visible";
        Juego.messages[4].lastChild.style = "visibility:visible";
        if (Juego.levels.length - 6 <= num - 6)  //comrpuebo si no quedan niveles por encima para deshabilita la flecha siguiente
            Juego.messages[4].lastChild.style = "visibility:hidden";
        if (tr1Levels.firstChild.id == "Nivel 1") //compruebo si estoy al principio de la lista de niveles para deshbilitar la flecha atrás
            Juego.messages[4].firstChild.style = "visibility:hidden";
        menu.appendChild(Juego.messages[4])
    }
    static arrivedBicho(bicho) {
        if (bicho.Action == true) {
            Juego.finishGameMalo(bicho);
        } else if (bicho.clase == "joey") {
            Juego.CurrentLevel.Amigos.splice(bicho.id, 1); //quito del array donde se contienen todos los elementos amigos
            document.getElementById(bicho.id).parentElement.removeChild(document.getElementById(bicho.id)) //lo quito del árbol DOM
            console.log("bueno ha cruzado")
        } else {
            // Juego.CurrentLevel.Bichos.splice(bicho.id, 1);
            Juego.CurrentLevel.Bichos[bicho.id]=null;
            console.log("cruza cometalo pongo a nulo")
            document.getElementById(bicho.id).parentElement.removeChild(document.getElementById(bicho.id)) //lo quito del árbol DOM            
            Juego.isWinGame() //metodo que comprueba si se ha ganado, y si se ha ganado saca mensaje de enhorabuena, limpia el nivel e inicia el siguiente
        }
    }
    static clickedBicho(bicho) {
        if (bicho.Clase == "joey") {
            Juego.finishGameBueno(bicho);
        } else {
            console.log("¡Bien hecho!")
            Juego.updateScore(bicho.Puntos);
            
            // Juego.CurrentLevel.Bichos.splice(bicho.id, 1);
            Juego.CurrentLevel.Bichos[bicho.id]=null;
            // indexOf

            bicho.Etiqueta.parentElement.removeChild(bicho.Etiqueta);

            Juego.isWinGame(bicho)
        }
    }
    static finishGameBueno(bicho) {
        //TODO mensaje has matado a un amigo 
        bicho.Etiqueta.parentElement.removeChild(bicho.Etiqueta);
        Juego.pausaBichos();
        document.body.appendChild(Juego.messages[8]);

                console.log("fin partida.bueno clicado")
        // finishGame(bicho);
    }
    static finishGameMalo(bicho) {
        bicho.Etiqueta.parentElement.removeChild(bicho.Etiqueta);
        Juego.pausaBichos();
        document.body.appendChild(Juego.messages[9]);
        console.log("fin partida.malo ha cruzado")
        //TODO mensaje han llegado los aliens
        //los meteoritos han caido
        // finishGame(bicho);
    }
    static isWinGame() { //metodo que comprueba si se ha ganado, y si se ha ganado saca mensaje de enhorabuena, limpia el nivel e inicia el siguiente
        var evils = Juego.CurrentLevel.Bichos;
        var quedan = 0
        for (let i = 0; i < evils.length; i++) {
            // if (evils[i] != (undefined||null)) quedan++;
            if (evils[i] != null) {quedan++;
            console.log(evils[i] )
            }

        }
        console.log("1uedan: "+quedan)
        if (quedan==0){
            Juego.pausaBichos();
            document.body.appendChild(Juego.messages[10]);
            setTimeout(Juego.nextLevel,3000);    
        };
    }
    static nextLevel() {
        document.body.removeChild(Juego.messages[10]);
        var nivelActual = Juego.CurrentLevel;
        // document.getElementById("scoreValue").removeChild(document.getElementById("scoreValue").firstChild);
        // document.getElementById("scoreValue").appendChild(document.createTextNode("0"));
        // // Juego.Puntos=0;
        Juego.cleanGame();
        var idnivelActual=nivelActual.Id;
        var nivelSiguiente=Juego.levels[idnivelActual]
        Juego.startLevel(nivelSiguiente);
        Juego.currentLevel=nivelSiguiente;
    }

    static finishGame(bicho) {
        
        //borrar nodo todos los elementos
        //limpiar arrayniveles y reiniciar el nivel (resset nivel)
        //boton cerrar que muestra nodo niveles
    }
    static resetLevel() {
        var nivelActual = Juego.CurrentLevel;
        document.getElementById("scoreValue").removeChild(document.getElementById("scoreValue").firstChild);
        document.getElementById("scoreValue").appendChild(document.createTextNode("0"));
        Juego.Puntos=0;
        Juego.cleanGame();
        Juego.startLevel(nivelActual);
    }
    static cleanGame() {
        document.body.removeChild(document.getElementById("ventanaAnimales"));
        var nivel=Juego.CurrentLevel;
        nivel.Bichos=[];
        nivel.Amigos=[];
    }
    static updateScore(puntos) {
        Juego.Score += puntos; //actualizo los puntos y los pongo en la etiqueta
        var etiqueta = document.getElementById("scoreValue");
        // var Valor = etiqueta.firstChild.wholeText;
        etiqueta.removeChild(etiqueta.firstChild);
        etiqueta.appendChild(document.createTextNode(Juego.Score));
    }
    static pausaBichos() {
        var friends = Juego.CurrentLevel.Amigos;
        for (let i = 0; i < friends.length; i++) {
            if (friends[i] != undefined)
                friends[i].Etiqueta.style.animationPlayState = "paused";
        }
        var evils = Juego.CurrentLevel.Bichos;
        for (let i = 0; i < evils.length; i++) {
            if (evils[i] != undefined)
                evils[i].Etiqueta.style.animationPlayState = "paused";
            // if (evils[i]!=undefined) evils[i].Etiqueta.style="animation-play-state:paused;"
        }
    }

    get Messages() { return messages; }
    get Levels() { return levels; }
    get Score() { return score; }

}
export { Juego };