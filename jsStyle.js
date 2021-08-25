var confStyle={
    'displayHeaderBackground':{'displayID':'social','displayWhenIdDisappear':'welcome'}, /**Debe ser un hijo directo de body para que funcione bien, si no habría que sumar sucesivos offsetTop de hasta el abuelo hijo de body */ 
    'displayShadow':{'displayID':'projects','displayWhenIdAppear':'shadow'}
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
    console.log("muevo")
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
    console.log('x '+x+'y '+y)

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
        canScroll=false
        requestAnimationFrame(funcionesScroll);
    }
})
function funcionesScroll() {
    displayHeaderBackground();
    displayShadow();
    canScroll=true
}
function displayHeaderBackground() {
    let developer = document.getElementById(confStyle.displayHeaderBackground.displayWhenIdDisappear)
    let element = document.getElementById(confStyle.displayHeaderBackground.displayID)

    if (window.scrollY>/*developer.offsetTop+*/developer.offsetHeight-(element.parentElement.offsetHeight*2)) {
        //element.style.opacity='1'
        element.style.backgroundColor='#150940'
        element.style.backgroundImage='radial-gradient(circle at 100% 80%,#501731,#00000000 )';  
    }
    else{
        element.style.backgroundColor='#15094000'
        element.style.backgroundImage='';

    }

}
function displayShadow() {
    let element = document.getElementById(confStyle.displayShadow.displayWhenIdAppear)
    let developer = document.getElementById(confStyle.displayShadow.displayID)
    element.style.opacity= 1-((developer.offsetHeight-window.scrollY*2)/developer.offsetHeight);
}
/**Control Buttons Gallery */
document.querySelectorAll('.galleryNext').forEach(e=>e.addEventListener('click',e=>{
    if (!e.disabled){
        let items = e.currentTarget.parentElement.parentElement.children[1]
        let itemsWidthDisplayed = items.offsetWidth;
        let itemsWidthReal = items.children[0].offsetWidth;
        let itemsChildrenWidth = items.children[0].children[0].offsetWidth;
    }
}))
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

var observer = new IntersectionObserver(showSkills, {root:null, rootMargin:"0px", threshold:0.2})
document.querySelectorAll("#code li").forEach(element => {
    observer.observe(element)
});
document.querySelectorAll("#tools li").forEach(element => {
    observer.observe(element)
});
function showSkills(entities) {
    entities.forEach(e=>{
        if (e.isIntersecting) {
            e.target.style.opacity="1"
        }
        else{
            e.target.style.opacity="0"
        }
    })
}