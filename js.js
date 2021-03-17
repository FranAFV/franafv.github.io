/**Fill projects gallery */
/**College works */
fetch('/projects.json',
    {
    method:'GET',
    mode:'cors',
    }
)
.then(function(response){
    if(response.ok){
        response.json().then(function(res){
            fillProjects(res,"school")
        }).catch(error =>{ 
            console.log('error:'+error) 
        })
    }
    else{
        console.log(response.statusText)
    }
})
.catch( error =>{ 
    console.log('error:'+error) 
});

function fillProjects(json,id) {
    let selector = "#"+id+" .items div"
    let section = document.querySelector(selector)
    for (const i of json) {
        let a = document.createElement('a');
            let e = document.createElement('div'); 
                let img = document.createElement('img')
                img.src = "/college/covers/"+i.meta.photo
                let name= document.createElement('h2')
                name.textContent=i.meta.fullName
                let description= document.createElement('p')
                description.textContent=i.meta.description

            e.appendChild(img)
            e.appendChild(name)
            e.appendChild(description)

        a.href=i.meta.link?i.meta.link:"/college/"+i.name+"/index.html"
        a.appendChild(e)

        section.appendChild(a)
    }
    
}