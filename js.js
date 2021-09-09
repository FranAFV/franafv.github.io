/**Fill projects gallery */
/**College works */
fetch('./projects.json',
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
                img.src = "./college/covers/"+i.meta.photo
                let name= document.createElement('h2')
                name.textContent=i.meta.fullName
                let description= document.createElement('p')
                description.textContent=i.meta.description
                let tags = document.createElement('div')
                tags.className='tags'
                i.meta.tags.forEach(i=>{
                    let tag = document.createElement('div')
                    tag.className='tag'
                    tag.textContent=i
                    tags.appendChild(tag)
                },tags)
                let date =document.createElement('div')
                date.className='date'
                date.textContent=i.meta.date
                let repo = document.createElement('div')
                if(i.meta.repository){
                    repo.className='repository'
                    let repoA=document.createElement('a')
                    repoA.href=i.meta.repository.url
                    if (i.meta.repository.type=="github"){
                        let repoI=document.createElement('i')
                        repoI.className="fab fa-github pl-1"
                        repoA.appendChild(repoI)
                    }
                    repoA.appendChild(document.createTextNode("fork me"))//="fork me";
                    repo.appendChild(repoA)
                }

            e.appendChild(img)
            e.appendChild(name)
            e.appendChild(description)
            e.appendChild(tags)
            e.appendChild(date)
            e.appendChild(repo) //TODO corregir posible null

        a.href=i.url?i.url:"./college/"+i.name+"/index.html"
        a.appendChild(e)

        section.appendChild(a)
    }
    
}