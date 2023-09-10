



window.addEventListener('load',()=>{

    const section = document.querySelector('section')
    var filters = []

    const createElement = (tag, innerText = "",innerHtml = "") =>{
        const element = document.createElement(tag)
        if(innerText){
            element.innerText = innerText
        }
        if(innerHtml){
            element.innerHTML = innerHtml
        }
        return element
    }
    
    const requireJobs = async()=>{
        section.innerHTML = ""

        const ul = createElement("ul")
        ul.classList.add('container-list')
        section.appendChild(ul)

        const require = fetch("./data.json").then((res)=>{
            return res.json()   
        })
        .then((data) => data.forEach(job => {
            // console.log(job)
            const li = createElement("li")
            ul.appendChild(li)

            const profileContents = createElement("div")
            profileContents.classList.add("profile-contents")
            li.appendChild(profileContents)

            const img = createElement("img")
            img.src = job.logo
            profileContents.appendChild(img)

            const title = createElement("div")
            title.classList.add("title")
            profileContents.appendChild(title)

            const profileNews = createElement("div")
            profileNews.classList.add("profileNews")
            title.appendChild(profileNews)

            const companyName = createElement("span",`${job.company}`,"",)
            companyName.classList.add("company")
        

            profileNews.appendChild(companyName)

            const alerts = createElement("div")
            alerts.classList.add("alerts")

            if(job.new == true || job.featured == true){
                profileNews.appendChild(alerts)
            }

            if(job.new == true){
                const _new = createElement('span',"","new!")
                _new.classList.add("new")
                alerts.appendChild(_new)
            }
            if(job.featured == true){
                const featured = createElement('span',"","featured")
                featured.classList.add("featured")
                alerts.appendChild(featured)
            }

            const position = createElement("h1",`${job.position}`,"")
            title.appendChild(position)

            const profileFooter = createElement("div","",`<div class="profile-footer">
            <span>${job.postedAt}</span>
            <span>${job.contract}</span>
            <span>${job.location}</span>
            </div>`)


            title.appendChild(profileFooter)
            
            const hardSkills = createElement("div")
            hardSkills.classList.add("hard-skills")

            if(job.role){
                const roleBtn = createElement('button',`${job.role}`,"")
                hardSkills.appendChild(roleBtn)

                roleBtn.addEventListener("click",({target})=>{
                    loadSearch(target)
                
                })
            }

            if(job.level){
                const levelBtn = createElement('button',`${job.level}`,"")
                hardSkills.appendChild(levelBtn)

                levelBtn.addEventListener("click",({target})=>{
                     loadSearch(target)
                     
                    
                })
            }

            if(job.languages){
                job.languages.forEach((language)=>{
                    let languageBtn = createElement("button",`${language}`,"")
                    hardSkills.appendChild(languageBtn)

                    languageBtn.addEventListener("click",({target})=>{
                        loadSearch(target)
                    })
                })
            }


            li.appendChild(hardSkills) 
            
        }))
    }

    const loadSearch = (target)=>{
        const loadfilters = ()=>{
            let searchBar = document.querySelector(".search")
            let filter = document.querySelector(".filter");
            let clearBtn= document.querySelector(".clear")
    
            if(searchBar == null){
                searchBar = createElement("div")
                searchBar.classList.add("search")
                section.appendChild(searchBar)
                filter = createElement("div")
                filter.classList.add("filter")
                searchBar.appendChild(filter)
                clearBtn = createElement("button","Clear")
                clearBtn.classList.add("clear")
                clearBtn.addEventListener("click",()=>{
                    filter.innerHTML = ""
                    filters =[]
                    requireJobs()
                })
    
    
                searchBar.appendChild(clearBtn)
                
            } 
        
            const searchbtns = createElement("div")
            searchbtns.classList.add("searchbtns")
    
            const buttonTarget = createElement("button",`${target.textContent}`)
            const buttonRemove = createElement("button","",`<img src="./images/icon-remove.svg" alt="">`)
    
            buttonRemove.classList.add("remove-filter")
            
            searchbtns.appendChild(buttonTarget)
            searchbtns.appendChild(buttonRemove)
    
        
            filter.appendChild(searchbtns)
            
    
            buttonRemove.addEventListener("click",({target})=>{
                let stext= searchbtns.textContent
                // console.log(filters)
                function check(i) {
                    return i == `${stext}`;
                  }
                let index = filters.findIndex(check);
                // console.log(index)
                // console.log(filters)
                searchbtns.remove(target)
                filters.splice(index,1)
                alljobs(filters)
            })
            alljobs(filters)
        } 

        if(filters.includes(target.textContent) == true){
          
            console.log(`${target.textContent} já está selecionado`)
        }else{
            filters.push(target.textContent)
    
            loadfilters()
        }


    }

    const alljobs = (filters)=>{
        console.log(filters)
        const searchbtns = document.querySelector(".searchbtns")
        const ul = document.querySelector(".container-list")
        const li = document.querySelectorAll("li")
        li.forEach(liJob =>{
            let tF = []
            const hardSkills = liJob.querySelector(".hard-skills")
            const bttns = hardSkills.querySelectorAll("button")
            bttns.forEach(btns=>{
                tF.push(filters.includes(btns.textContent))
            })
            if(tF.includes(true)){
                liJob.style.display = "flex"
            }else{
                liJob.style.display = "none"
            }
            if(filters.length == 0){
                 requireJobs()
            }

        })
    }
    requireJobs()
})

