import"./main-4e50fb73.js";const a=document.querySelector("#collections"),c="https://attractions-api-jhwt.onrender.com",l=document.querySelector("#navBar");let i=localStorage.getItem("userId");function s(){axios.get(c+"/collections?userId="+i+"&_expand=view").then(function(t){console.log(t.data);const n=t.data;let o="";n.forEach(function(e){o+=`
          <div class="col">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title text-center">${e.view.name}</h5>
                <p class="card-text">${e.view.description.slice(0,45)}...</p>
                <div class="text-center">
                  <a href="./detail.html?id=${e.view.id}" class="btn btn-secondary text-white mt-2">看看</a>
                </div>
              </div>
            </div>
          </div>`}),a.innerHTML=o})}s();localStorage.getItem("token")==null?console.log("還沒登入"):(console.log("已登入"),localStorage.getItem("role")=="admin"?l.innerHTML=` 
    <a class="me-3" href="/pages/backboard.html">後台</a>
    <a class="me-3" href="/pages/collections.html">我的收藏</a>
    <input id="logoutBtn" type="button" class="btn btn-secondary text-white " value="登出">
    `:l.innerHTML=` 
    <a class="me-3" href="/pages/collections.html">我的收藏</a>
    <input id="logoutBtn" type="button" class="btn btn-secondary text-white " value="登出">
    `,document.querySelector("#logoutBtn").addEventListener("click",function(){localStorage.removeItem("token"),localStorage.removeItem("role"),localStorage.removeItem("userId"),location.reload(),window.location.href="https://wenjenchun.github.io/attractions-collection/index.html"}));
