import {Animal,Bicho,Bueno,Comet} from "./animal.js";
import {Juego} from "./juego.js";
class Nivel{
    static timingFunction =["ease","linear","ease-in","ease-out"];
    constructor(num) {
        this.name="Nivel "+num;
        this.id=Number(num);
        this.bichos=[];
        this.amigos=[];
        this.bichosFast=[];
    }
    ponBichos(){
        var ventanaAnimales = document.createElement("div");
        ventanaAnimales.id="ventanaAnimales";

        for (let i of this.Bichos) {
            if (i!=undefined)
            ventanaAnimales.appendChild(i.Etiqueta)
        }
        for (let i of this.amigos) {
            if (i!=undefined)
            ventanaAnimales.appendChild(i.Etiqueta)
        }
        document.body.appendChild(ventanaAnimales);
    }
    get Name(){
        return this.name;
    }
    get Id(){
        return this.id;
    }
    get Bichos(){
        return this.bichos;
    }
    get Amigos(){
        return this.amigos;
    }
    get BichosFast(){
        return this.bichosFast;
    }
    set Bichos(bichos){
        this.bichos=bichos;
    }
    set Amigos(amigos){
        this.amigos=amigos;
    }
}
class Uno extends Nivel{
    constructor() {
        super(1);
    }
    startLevel(){
        this.createBichos();
        this.interfazNivel();
        super.ponBichos()
    }
    interfazNivel(){
        if(document.getElementById("f1")) document.body.removeChild(document.getElementById("f1"));
        //Elimino elementos del menú y Oculto fmenú
        // document.body.removeChild(document.getElementById("menulayer"));
        Juego.cleanNode(document.getElementById("menu"))
        document.getElementById("menulayer").style="visibility:hidden;"

        //Fondos nivel 1
        var fg = document.createElement("div");
        var fm = document.createElement("div");
        var fp = document.createElement("div");
        var f = document.createElement("div");//TODO Poner todos los fondos en un padre div

        fg.id="fg1";
        fm.id="fm1";
        fp.id="fp1";
        f.id="f1";
        fg.className="background";
        fm.className="background";
        fp.className="background";
        f.className="background";
        // document.body.style="div{width: 100vw;height: 100vh;overflow: hidden;}";
        // document.body.appendChild(fg);
        // document.body.appendChild(fm);
        // document.body.appendChild(fp);
        // document.body.appendChild(f);
        f.appendChild(fg);
        f.appendChild(fm);
        f.appendChild(fp);
        document.body.appendChild(f);
    }
    createBichos(){

        var id = 0;
        var tamañobichos=100; //TODO aumentar tamaño para pantallas con gran resolución
        var velocidadAdaptada=(window.innerWidth*20/1920).toFixed(2); //TODO reducir la velocidad (aumentar el valor en ralidad pues es en segundos)aun más en moviles pequeños para compensar 
        var posicionLimite=100-(tamañobichos*100/window.innerHeight); //calculo el top: vh máximo para que nunca sea 100vh y por tanto el bicho no se oculte o corte por el botton de la pantalla

        //creo los bichos
        var numEvil=2;
        var totalTimeEvilDelay=0;
        var evilBeat=5; //Cadencia base con la que aparecen los bichos
        for(let i = 0; i < numEvil; i++) {
            let posicion=Math.round(Math.random()*posicionLimite);
            let delay=(Math.random()*evilBeat).toFixed(2);
            totalTimeEvilDelay+=Number(delay);
            let bicho = new Bicho(id,20,posicion,1,velocidadAdaptada,totalTimeEvilDelay,"linear",true);
            super.Bichos[id]=bicho;
            id++
        }
        //creo los amigos
        var numFriends=2;
        var totalTimeFriendsDelay=2;
        var beatFriends=3;
        for(let i = 0; i < numFriends; i++) {
            let posicion=Math.round(Math.random()*posicionLimite);
            let delay=(Math.random()*beatFriends).toFixed(2);
            totalTimeFriendsDelay+=Number(delay);
            let bicho = new Bueno(id,posicion,1,velocidadAdaptada,totalTimeFriendsDelay,"linear");
            super.Amigos[id]=bicho;
            id++
        }
        //creo los cometas
        var numCometas=2;
        var totalTimeCometDelay=2;
        var beatCometa=2;
        var velocidadCometa=velocidadAdaptada/2;
        for(let i = numEvil; i < (numEvil+numCometas); i++) {
            let posicion=Math.round(Math.random()*posicionLimite);
            let delay=(Math.random()*beatCometa).toFixed(2);
            totalTimeCometDelay+=Number(delay);
            var bicho = new Comet(id,20,posicion,1,velocidadCometa,totalTimeCometDelay,"linear",false);
            super.Bichos[id]=bicho;
            id++
        }
    }
}
class Dos extends Nivel{
    constructor() {
        super(2);
    }
    startLevel(){
        this.createBichos();
        this.interfazNivel();
        super.ponBichos()
    }
    interfazNivel(){
        if(document.getElementById("f1")) document.body.removeChild(document.getElementById("f1"));
        //Elimino elementos del menú y Oculto fmenú
        // document.body.removeChild(document.getElementById("menulayer"));
        Juego.cleanNode(document.getElementById("menu"))
        document.getElementById("menulayer").style="visibility:hidden;"

        //Fondos nivel 1
        var fg = document.createElement("div");
        var fm = document.createElement("div");
        var fp = document.createElement("div");
        var f = document.createElement("div");//TODO Poner todos los fondos en un padre div

        fg.id="fg1";
        fm.id="fm1";
        fp.id="fp1";
        f.id="f1";
        fg.className="background";
        fm.className="background";
        fp.className="background";
        f.className="background";

        f.appendChild(fg);
        f.appendChild(fm);
        f.appendChild(fp);
        document.body.appendChild(f);
    }

    createBichos(){
        var id = 0;
        var tamañobichos=100; //TODO aumentar tamaño para pantallas con gran resolución
        var velocidadAdaptada=(window.innerWidth*12/1920).toFixed(2); //TODO reducir la velocidad (aumentar el valor en ralidad pues es en segundos)aun más en moviles pequeños para compensar 
        var posicionLimite=100-(tamañobichos*100/window.innerHeight); //calculo el top: vh máximo para que nunca sea 100vh y por tanto el bicho no se oculte o corte por el botton de la pantalla
        
        var numEvil=5;
        var totalTimeEvilDelay=0;
        var evilBeat=2; //Cadencia base con la que aparecen los bichos
        //creo los bichos
        for(let i = 0; i < numEvil; i++) {
            let posicion=Math.round(Math.random()*posicionLimite);
            let delay=(Math.random()*evilBeat).toFixed(2);
            totalTimeEvilDelay+=Number(delay);
            let bicho = new Bicho(id,20,posicion,1,velocidadAdaptada,totalTimeEvilDelay,"linear",true);
            super.Bichos[id]=bicho;
            id++
        }
        //creo los amigos
        var numFriends=5;
        var totalTimeFriendsDelay=0;
        var beatFriends=totalTimeEvilDelay/numFriends;
        for(let i = 0; i < numFriends; i++) {
            let posicion=Math.round(Math.random()*posicionLimite);
            let delay=(Math.random()*beatFriends).toFixed(2);
            totalTimeFriendsDelay+=Number(delay);
            let bicho = new Bueno(id,posicion,1,velocidadAdaptada,totalTimeFriendsDelay,"linear");
            id++
            super.Amigos[i]=bicho;
        }
        //creo los cometas
        var numCometas=2;
        var totalTimeCometDelay=0;
        var beatCometa=totalTimeEvilDelay/numCometas;
        var velocidadCometa=velocidadAdaptada/3;
        for(let i = numEvil; i < (numEvil+numCometas); i++) {
            let posicion=Math.round(Math.random()*posicionLimite);
            let delay=(Math.random()*beatCometa).toFixed(2);
            totalTimeCometDelay+=Number(delay);
            var bicho = new Comet(id,20,posicion,1,velocidadCometa,totalTimeCometDelay,"linear",false);  
            super.Bichos[id]=bicho;
            id++
        }
    }

}
class Tres extends Nivel{
    constructor() {
        super(3);
    }
    startLevel(){
        this.createBichos();
        this.interfazNivel();
        super.ponBichos()
    }
    interfazNivel(){
        if(document.getElementById("f1")) document.body.removeChild(document.getElementById("f1"));
        Juego.cleanNode(document.getElementById("menu"))
        document.getElementById("menulayer").style="visibility:hidden;"

        //Fondos nivel 1
        var fg = document.createElement("div");
        var fm = document.createElement("div");
        var fp = document.createElement("div");
        var f = document.createElement("div");//TODO Poner todos los fondos en un padre div

        fg.id="fg1";
        fm.id="fm1";
        fp.id="fp1";
        f.id="f1";
        fg.className="background";
        fm.className="background";
        fp.className="background";
        f.className="background";
        f.appendChild(fg);
        f.appendChild(fm);
        f.appendChild(fp);
        document.body.appendChild(f);
    }

    createBichos(){
        var id = 0;
        var tamañobichos=100; //TODO aumentar tamaño para pantallas con gran resolución
        var velocidadAdaptada=(window.innerWidth*12/1920).toFixed(2); //TODO reducir la velocidad (aumentar el valor en ralidad pues es en segundos)aun más en moviles pequeños para compensar 
        var posicionLimite=100-(tamañobichos*100/window.innerHeight); //calculo el top: vh máximo para que nunca sea 100vh y por tanto el bicho no se oculte o corte por el botton de la pantalla
        
        var numEvil=15;
        var totalTimeEvilDelay=0;
        var evilBeat=2; //Cadencia base con la que aparecen los bichos
        //creo los bichos
        for(let i = 0; i < numEvil; i++) {
            let posicion=Math.round(Math.random()*posicionLimite);
            let delay=(Math.random()*evilBeat).toFixed(2);
            totalTimeEvilDelay+=Number(delay);
            let bicho = new Bicho(id,30,posicion,1,velocidadAdaptada,totalTimeEvilDelay,"linear",true);
            super.Bichos[id]=bicho;
            id++
        }
        //creo los amigos
        var numFriends=5;
        var totalTimeFriendsDelay=0;
        var beatFriends=totalTimeEvilDelay/numFriends;
        for(let i = 0; i < numFriends; i++) {
            let posicion=Math.round(Math.random()*posicionLimite);
            let delay=(Math.random()*beatFriends).toFixed(2);
            totalTimeFriendsDelay+=Number(delay);
            let bicho = new Bueno(id,posicion,1,velocidadAdaptada,totalTimeFriendsDelay,"linear");
            super.Amigos[i]=bicho;            
            id++

        }
        //creo los cometas
        var numCometas=5;
        var totalTimeCometDelay=0;
        var beatCometa=totalTimeEvilDelay/numCometas;
        var velocidadCometa=velocidadAdaptada/3;
        for(let i = numEvil; i < (numEvil+numCometas); i++) {
            let posicion=Math.round(Math.random()*posicionLimite);
            let delay=(Math.random()*beatCometa).toFixed(2);
            totalTimeCometDelay+=Number(delay);
            var bicho = new Comet(id,30,posicion,1,velocidadCometa,totalTimeCometDelay,"linear",false);
            super.Bichos[id]=bicho;
            id++

        }
    }


}
class Cuatro extends Nivel{
    constructor() {
        super(4);
    }
    startLevel(){
        this.createBichos();
        this.interfazNivel();
        super.ponBichos()
    }
    interfazNivel(){
        if(document.getElementById("f1")) document.body.removeChild(document.getElementById("f1"));
        Juego.cleanNode(document.getElementById("menu"))
        document.getElementById("menulayer").style="visibility:hidden;"

        //Fondos nivel 1
        var fg = document.createElement("div");
        var fm = document.createElement("div");
        var fp = document.createElement("div");
        var f = document.createElement("div");//TODO Poner todos los fondos en un padre div

        fg.id="fg1";
        fm.id="fm1";
        fp.id="fp1";
        f.id="f1";
        fg.className="background";
        fm.className="background";
        fp.className="background";
        f.className="background";
        f.appendChild(fg);
        f.appendChild(fm);
        f.appendChild(fp);
        document.body.appendChild(f);
    }

    createBichos(){
        var id = 0;
        var tamañobichos=100; //TODO aumentar tamaño para pantallas con gran resolución
        var velocidadAdaptada=(window.innerWidth*12/1920).toFixed(2); //TODO reducir la velocidad (aumentar el valor en ralidad pues es en segundos)aun más en moviles pequeños para compensar 
        var posicionLimite=100-(tamañobichos*100/window.innerHeight); //calculo el top: vh máximo para que nunca sea 100vh y por tanto el bicho no se oculte o corte por el botton de la pantalla
        
        var numEvil=5;
        var totalTimeEvilDelay=0;
        var evilBeat=2; //Cadencia base con la que aparecen los bichos
        //creo los bichos
        for(let i = 0; i < numEvil; i++) {
            let posicion=Math.round(Math.random()*posicionLimite);
            let delay=(Math.random()*evilBeat).toFixed(2);
            totalTimeEvilDelay+=Number(delay);
            let bicho = new Bicho(id,40,posicion,1*Math.random()*0.5+0.5,velocidadAdaptada,totalTimeEvilDelay,"linear",true);
            super.Bichos[id]=bicho;
            id++
        }
        //creo los amigos
        var numFriends=5;
        var totalTimeFriendsDelay=0;
        var beatFriends=totalTimeEvilDelay/numFriends;
        for(let i = 0; i < numFriends; i++) {
            let posicion=Math.round(Math.random()*posicionLimite);
            let delay=(Math.random()*beatFriends).toFixed(2);
            totalTimeFriendsDelay+=Number(delay);
            let bicho = new Bueno(id,posicion,1*Math.random()*0.5+0.5,velocidadAdaptada,totalTimeFriendsDelay,"linear");
            id++;
            super.Amigos[i]=bicho;
        }
        //creo los cometas
        var numCometas=2;
        var totalTimeCometDelay=0;
        var beatCometa=totalTimeEvilDelay/numCometas;
        var velocidadCometa=velocidadAdaptada/3;
        for(let i = numEvil; i < (numEvil+numCometas); i++) {
            let posicion=Math.round(Math.random()*posicionLimite);
            let delay=(Math.random()*beatCometa).toFixed(2);
            totalTimeCometDelay+=Number(delay);
            var bicho = new Comet(id,40,posicion,1*Math.random()*0.5+0.5,velocidadCometa,totalTimeCometDelay,"linear",false);  
            super.Bichos[id]=bicho;
            id++
        }
    }

}

class Cinco extends Nivel{
    constructor() {
        super(5);
    }
    startLevel(){
        this.createBichos();
        this.interfazNivel();
        super.ponBichos()
    }
    interfazNivel(){
        if(document.getElementById("f1")) document.body.removeChild(document.getElementById("f1"));
        Juego.cleanNode(document.getElementById("menu"))
        document.getElementById("menulayer").style="visibility:hidden;"

        //Fondos nivel 1
        var fg = document.createElement("div");
        var fm = document.createElement("div");
        var fp = document.createElement("div");
        var f = document.createElement("div");//TODO Poner todos los fondos en un padre div

        fg.id="fg1";
        fm.id="fm1";
        fp.id="fp1";
        f.id="f1";
        fg.className="background";
        fm.className="background";
        fp.className="background";
        f.className="background";
        f.appendChild(fg);
        f.appendChild(fm);
        f.appendChild(fp);
        document.body.appendChild(f);
    }

    createBichos(){
        var id = 0;
        var tamañobichos=100; //TODO aumentar tamaño para pantallas con gran resolución
        var velocidadAdaptada=(window.innerWidth*12/1920).toFixed(2); //TODO reducir la velocidad (aumentar el valor en ralidad pues es en segundos)aun más en moviles pequeños para compensar 
        var posicionLimite=100-(tamañobichos*100/window.innerHeight); //calculo el top: vh máximo para que nunca sea 100vh y por tanto el bicho no se oculte o corte por el botton de la pantalla
        
        var numEvil=15;
        var totalTimeEvilDelay=0;
        var evilBeat=2; //Cadencia base con la que aparecen los bichos
        //creo los bichos
        for(let i = 0; i < numEvil; i++) {
            let posicion=Math.round(Math.random()*posicionLimite);
            let delay=(Math.random()*evilBeat).toFixed(2);
            totalTimeEvilDelay+=Number(delay);
            let bicho = new Bicho(id,40,posicion,1*Math.random()*0.5+0.5,velocidadAdaptada,totalTimeEvilDelay,"linear",true);
            super.Bichos[i]=bicho;
            id++
        }
        //creo los amigos
        var numFriends=5;
        var totalTimeFriendsDelay=0;
        var beatFriends=totalTimeEvilDelay/numFriends;
        for(let i = 0; i < numFriends; i++) {
            let posicion=Math.round(Math.random()*posicionLimite);
            let delay=(Math.random()*beatFriends).toFixed(2);
            totalTimeFriendsDelay+=Number(delay);
            let bicho = new Bueno(id,posicion,1*Math.random()*0.5+0.5,velocidadAdaptada,totalTimeFriendsDelay,"linear");
            id++
            super.Amigos[i]=bicho;
        }
        //creo los cometas
        var numCometas=5;
        var totalTimeCometDelay=0;
        var beatCometa=totalTimeEvilDelay/numCometas;
        var velocidadCometa=velocidadAdaptada/3;
        for(let i = numEvil; i < (numEvil+numCometas); i++) {
            let posicion=Math.round(Math.random()*posicionLimite);
            let delay=(Math.random()*beatCometa).toFixed(2);
            totalTimeCometDelay+=Number(delay);
            var bicho = new Comet(id,40,posicion,1*Math.random()*0.5+0.5,velocidadCometa,totalTimeCometDelay,"linear",false);
            id++
            super.Bichos[i]=bicho;
        }
    }
}
class Seis extends Nivel{
    constructor() {
        super(6);
    }
    startLevel(){
        this.createBichos();
        this.interfazNivel();
        super.ponBichos()
    }
    interfazNivel(){
        if(document.getElementById("f1")) document.body.removeChild(document.getElementById("f1"));
        Juego.cleanNode(document.getElementById("menu"))
        document.getElementById("menulayer").style="visibility:hidden;"

        //Fondos nivel 1
        var fg = document.createElement("div");
        var fm = document.createElement("div");
        var fp = document.createElement("div");
        var f = document.createElement("div");//TODO Poner todos los fondos en un padre div

        fg.id="fg1";
        fm.id="fm1";
        fp.id="fp1";
        f.id="f1";
        fg.className="background";
        fm.className="background";
        fp.className="background";
        f.className="background";
        f.appendChild(fg);
        f.appendChild(fm);
        f.appendChild(fp);
        document.body.appendChild(f);
    }

    createBichos(){
        var id = 0;
        var tamañobichos=100; //TODO aumentar tamaño para pantallas con gran resolución
        var velocidadAdaptada=(window.innerWidth*10/1920).toFixed(2); //TODO reducir la velocidad (aumentar el valor en ralidad pues es en segundos)aun más en moviles pequeños para compensar 
        var posicionLimite=100-(tamañobichos*100/window.innerHeight); //calculo el top: vh máximo para que nunca sea 100vh y por tanto el bicho no se oculte o corte por el botton de la pantalla
        
        var numEvil=10;
        var totalTimeEvilDelay=0;
        var evilBeat=2; //Cadencia base con la que aparecen los bichos
        //creo los bichos
        for(let i = 0; i < numEvil; i++) {
            let posicion=Math.round(Math.random()*posicionLimite);
            let delay=(Math.random()*evilBeat).toFixed(2);
            totalTimeEvilDelay+=Number(delay);
            let bicho = new Bicho(id,50,posicion,1*Math.random()*0.5+0.5,velocidadAdaptada,totalTimeEvilDelay,"linear",true);
            super.Bichos[id]=bicho;
            id++
        }
        //creo los amigos
        var numFriends=10;
        var totalTimeFriendsDelay=0;
        var beatFriends=totalTimeEvilDelay/numFriends;
        for(let i = 0; i < numFriends; i++) {
            let posicion=Math.round(Math.random()*posicionLimite);
            let delay=(Math.random()*beatFriends).toFixed(2);
            totalTimeFriendsDelay+=Number(delay);
            let bicho = new Bueno(id,posicion,1*Math.random()*0.5+0.5,velocidadAdaptada,totalTimeFriendsDelay,"linear");
            id++;
            super.Amigos[i]=bicho;
        }
        //creo los cometas
        var numCometas=10;
        var totalTimeCometDelay=0;
        var beatCometa=totalTimeEvilDelay/numCometas;
        var velocidadCometa=velocidadAdaptada/3;
        for(let i = numEvil; i < (numEvil+numCometas); i++) {
            let posicion=Math.round(Math.random()*posicionLimite);
            let delay=(Math.random()*beatCometa).toFixed(2);
            totalTimeCometDelay+=Number(delay);
            var bicho = new Comet(id,50,posicion,1*Math.random()*0.5+0.5,velocidadCometa,totalTimeCometDelay,"linear",false);  
            super.Bichos[id]=bicho;
            id++
        }
    }

}

class Siete extends Nivel{
    constructor() {
        super(7);
    }
    startLevel(){
        this.createBichos();
        this.interfazNivel();
        super.ponBichos()
    }
    interfazNivel(){
        if(document.getElementById("f1")) document.body.removeChild(document.getElementById("f1"));
        Juego.cleanNode(document.getElementById("menu"))
        document.getElementById("menulayer").style="visibility:hidden;"

        //Fondos nivel 1
        var fg = document.createElement("div");
        var fm = document.createElement("div");
        var fp = document.createElement("div");
        var f = document.createElement("div");//TODO Poner todos los fondos en un padre div

        fg.id="fg1";
        fm.id="fm1";
        fp.id="fp1";
        f.id="f1";
        fg.className="background";
        fm.className="background";
        fp.className="background";
        f.className="background";
        f.appendChild(fg);
        f.appendChild(fm);
        f.appendChild(fp);
        document.body.appendChild(f);
    }

    createBichos(){
        var id = 0;
        var tamañobichos=100; //TODO aumentar tamaño para pantallas con gran resolución
        var velocidadAdaptada=(window.innerWidth*9/1920).toFixed(2); //TODO reducir la velocidad (aumentar el valor en ralidad pues es en segundos)aun más en moviles pequeños para compensar 
        var posicionLimite=100-(tamañobichos*100/window.innerHeight); //calculo el top: vh máximo para que nunca sea 100vh y por tanto el bicho no se oculte o corte por el botton de la pantalla
        
        var numEvil=15;
        var totalTimeEvilDelay=0;
        var evilBeat=2; //Cadencia base con la que aparecen los bichos
        //creo los bichos
        for(let i = 0; i < numEvil; i++) {
            let posicion=Math.round(Math.random()*posicionLimite);
            let delay=(Math.random()*evilBeat).toFixed(2);
            totalTimeEvilDelay+=Number(delay);
            let bicho = new Bicho(id,60,posicion,1*Math.random()*0.5+0.5,velocidadAdaptada,totalTimeEvilDelay,"linear",true);
            super.Bichos[i]=bicho;
            id++
        }
        //creo los amigos
        var numFriends=5;
        var totalTimeFriendsDelay=0;
        var beatFriends=totalTimeEvilDelay/numFriends;
        for(let i = 0; i < numFriends; i++) {
            let posicion=Math.round(Math.random()*posicionLimite);
            let delay=(Math.random()*beatFriends).toFixed(2);
            totalTimeFriendsDelay+=Number(delay);
            let bicho = new Bueno(id,posicion,1*Math.random()*0.5+0.5,velocidadAdaptada,totalTimeFriendsDelay,"linear");
            id++
            super.Amigos[i]=bicho;
        }
        //creo los cometas
        var numCometas=5;
        var totalTimeCometDelay=0;
        var beatCometa=totalTimeEvilDelay/numCometas;
        var velocidadCometa=velocidadAdaptada/3;
        for(let i = numEvil; i < (numEvil+numCometas); i++) {
            let posicion=Math.round(Math.random()*posicionLimite);
            let delay=(Math.random()*beatCometa).toFixed(2);
            totalTimeCometDelay+=Number(delay);
            var bicho = new Comet(id,60,posicion,1*Math.random()*0.5+0.5,velocidadCometa,totalTimeCometDelay,"linear",false);
            id++
            super.Bichos[i]=bicho;
        }
    }
}

export {Nivel,Uno,Dos,Tres,Cuatro,Cinco,Seis, Siete};