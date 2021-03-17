var confStyle={
    'displayHeader':{'displayID':'social','displayWhenIdDisappear':'welcome'} /**Debe ser un hijo directo de body para que funcione bien, si no habría que sumar sucesivos offsetTop de hasta el abuelo hijo de body */ 
}

/**Control - Close(remove) elements*/
var close = document.querySelectorAll(".close")
for (const iterator of close) {
    iterator.addEventListener('click',(e)=>{
        e.target.parentElement.remove();
    })
}

/**Control mousemove over the title. Mousemove changes gradient background-position that fill the element TITLE. important css used: background-clip*/
var radial = document.querySelector('.radialBackground')
var father = document.querySelector('.radialFather')

var movedGradient=true;
var eventGradient={};
father.addEventListener('mousemove',(e)=>{
    if(movedGradient==true){
        movedGradient=false
        eventGradient.target=e.target;
        eventGradient.currentTarget=e.currentTarget;
        eventGradient.offsetY=e.offsetY;
        eventGradient.offsetX=e.offsetX;
        requestAnimationFrame(moveGradient);
    }
})
function moveGradient(){
    let x=0, y=0;
    if (eventGradient.currentTarget && eventGradient.target.id!=eventGradient.currentTarget.id ) {
        y=eventGradient.target.offsetTop;
        x=eventGradient.target.offsetLeft;
    }
    var style = window.getComputedStyle(radial, null).getPropertyValue('font-size');
    var fontSize = parseFloat(style);
     
    x = -father.offsetWidth+eventGradient.offsetX+x;
    y = -father.offsetHeight+eventGradient.offsetY+y-fontSize;
    //console.log('x '+x+'y '+y)

    radial.style.backgroundPositionX=x+'px';
    radial.style.backgroundPositionY=y+'px';
    movedGradient=true;
}


//** Control Scroll and show elements */
var canScroll = true;
var scrollPosition = 0;
var eventScroll;
document.addEventListener('scroll',(e)=>{
    if(canScroll==true){
        //eventScroll=e
        canScroll=false
        /* eventGradient.target=e.target;
        eventGradient.currentTarget=e.currentTarget;
        eventGradient.offsetY=e.offsetY;
        eventGradient.offsetX=e.offsetX; */
        requestAnimationFrame(displayHeader);
    }
})
function displayHeader() {
    let developer = document.getElementById(confStyle.displayHeader.displayWhenIdDisappear)
    let element = document.getElementById(confStyle.displayHeader.displayID)

    if (window.scrollY>developer.offsetTop+developer.offsetHeight-(element.parentElement.offsetHeight*2)) {
        //element.style.opacity='1'
        element.style.backgroundColor='#150940'
        element.style.backgroundImage='radial-gradient(circle at 100% 80%,#501731,#00000000 )';  
/*         element.parentElement.style.borderBottom='1px solid rgba(240, 248, 255, 0.39)';
 */    }
    else{
        //element.style.opacity='0';
        element.style.backgroundColor='#15094000'
        element.style.backgroundImage='';
/*         element.parentElement.style.borderBottom='0px solid rgba(240, 248, 255, 0.39)';
 */
    }
    canScroll=true
/*     console.log(element);
    console.log(eventScroll);
    console.log(window.scrollY); */
}

/* //var e= false;
document.addEventListener('scroll',scroll)
function scroll(e) {
    if(window.scrollY<father.offsetHeight){
        e.preventDefault()
        window.scroll(
            {
                top: father.offsetHeight,
                left: 0,
                behavior: 'smooth'
            }
        )
    }
        
   console.log('vk')
document.removeEventListener('scroll',scroll) 
} */