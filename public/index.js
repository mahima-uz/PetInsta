
const GET_FEED_API_CONFIG={
    url:"/api/getFeed",
    method:"POST",
    body:{}
}

const getFeed=async()=>{
    const fetchRes = await fetch(GET_FEED_API_CONFIG.url, {
        method: GET_FEED_API_CONFIG.method,
        body: JSON.stringify(GET_FEED_API_CONFIG.body),
        headers: {
          'Content-Type': 'application/json'
        },
    });
    const data = await fetchRes.json();
    return data;
}

const renderPage=(pageLoadData)=>{

    const rootContainer=document.querySelector("#feed-container");
    for(let i=0;i<pageLoadData.length;i++){
        const posts=pageLoadData[i];
        posts.forEach(element=>{
        rootContainer.innerHTML+=`
        <div class="post">
            <div class="info">
                <div class="user">
                    <div class="profile-pic"><img src=${element.profilePicture} alt=""></div>
                        <p class="username">${element.username}</p>
                    </div>
                        <img src= class="options" alt="">
                    </div>
                    <img src=${element.mediaLink} class="post-image" alt="">
                    <div class="post-content">   
                        <p class="likes">${element.likes} likes</p>
                        <p class="description"><span>${element.username} </span> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur tenetur veritatis placeat, molestiae impedit aut provident eum quo natus molestias?</p>
                        <p class="post-time">${element.time}</p>
                        <p class="post-time">${element.date}</p>
                        <p class="post-time">${element.location}</p>
                    </div>                
                </div>`
        })
    }
    
}

window.onload=async(e) =>{
    console.log("window onload::e", e);
    const pageLoadData = await getFeed();
    console.log(pageLoadData);
    renderPage(pageLoadData);
}


// Create Post
var modal = document.getElementById("createpost-modal");
var btn = document.getElementById("add-post");
var span = document.getElementsByClassName("close")[0];

btn.addEventListener('click', function(e) {
    document.getElementById("main").style.opacity="0.3";
    modal.style.display = "block";
});

span.addEventListener('click', function(e) {
    document.getElementById("main").style.opacity="1";
    modal.style.display = "none";
});

window.addEventListener('click', function(e) {
    if (e.target == modal) {
        modal.style.display = "none";
      }
});

userid=1;
document.getElementById("userid-hidden").value=userid;