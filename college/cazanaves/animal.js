import {Juego} from "./juego.js";

class Animal{

    constructor(id,clase,puntos,estado,posicion,tamaño,velocidad,retardo,timingF,action) {
        this.id=id;
        this.clase=clase;
        this.puntos=puntos;
        this.estado=estado;
        this.posicion=posicion;
        this.tamaño=tamaño;
        this.velocidad=velocidad;
        this.retardo=retardo;
        this.timingF=timingF;
        this.action=action;
        this.etiqueta=this.createElement();
    }
    createElement(){
        var label = document.createElement("div");
        label.id=this.id;
        label.className=this.clase;
        label.style="width: 115px;height:100px;top:"+this.posicion+"vh;left:-115px;transform: scale("+this.tamaño+");animation-duration:"+this.velocidad+"s;animation-delay:"+this.retardo+"s;animation-timing-function:"+this.timingF+";"

        // if (this.action==true){ //el valor action me indica si este bicho al cruzar la pantalla finaliza el juego o permite continuar con él
            label.addEventListener("animationend",
                ()=>{
                    Juego.arrivedBicho(this);
                });

            label.addEventListener("click",
                ()=>{
                    this.estado="muerto";
                    this.etiqueta.style.backgroundImage=' url("img/sprite/explosion/baked-potato-explosione.gif")';
                    //TODO agregar sonido e imagen de explosion
                    setTimeout(Juego.clickedBicho,300,this)
                });
        return label;
    }
    get Id(){
        return this.id;
    }
    set Id(id){
        this.Id=id;
    }
    get Clase(){
        return this.clase;
    }
    get Puntos(){
        return this.puntos;
    }
    get Estado(){
        return this.estado;
    }
    get Tamaño(){
        return this.tamaño;
    }
    get Velocidad(){
        return this.velocidad;
    }
    get Etiqueta(){
        return this.etiqueta;
    }
    get Tamaño(){
        return this.tamaño;
    }
    get TimingF(){
        return this.timingF;
    }
    get Etiqueta(){
        return this.etiqueta;
    }
    get Action(){
        return this.action;
    }
    set Puntos(puntos){
        this.puntos=puntos;
    }
    set Estado(estado){
        this.estado=estado;
    }
    set Tamaño(tamaño){
        this.tamaño=tamaño;
    }
    set Velocidad(id){
        this.velocidad=velocidad;
    }
}
class Bicho extends Animal{

    constructor(id,puntos,posicion,tamaño,velocidad,retardo,timingF,action) {
        super(id,"ufo",puntos,true,posicion,tamaño,velocidad,retardo,timingF,action)
    }

}
class Comet extends Animal{

    constructor(id,puntos,posicion,tamaño,velocidad,retardo,timingF,action) {
        super(id,"comet",puntos*2,true,posicion,tamaño,velocidad,retardo,timingF,action)
    }

}
class Bueno extends Animal{

    constructor(id,posicion,tamaño,velocidad,retardo,timingF) {
        super(id,"joey",0,true,posicion,tamaño,velocidad,retardo,timingF,false)
    }

}

export {Animal,Bicho,Bueno,Comet};