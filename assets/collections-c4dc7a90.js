import"./main-1da5e8c0.js";const c=localStorage.getItem("token")!==null,a=localStorage.getItem("role")==="admin",l=document.getElementById("header-content");l.innerHTML=`
<%- include('./layout/header.ejs', { isLogIn: ${c}, isAdmin: ${a} }); -%>
`;const i=document.querySelector("#collections"),r="https://attractions-api-jhwt.onrender.com";document.querySelector("#navBar");let d=localStorage.getItem("userId");function s(){axios.get(r+"/collections?userId="+d+"&_expand=view").then(function(e){console.log(e.data);const n=e.data;let o="";n.forEach(function(t){o+=`
          <div class="col">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title text-center">${t.view.name}</h5>
                <p class="card-text">${t.view.description.slice(0,45)}...</p>
                <div class="text-center">
                  <a href="./detail.html?id=${t.view.id}" class="btn btn-secondary text-white mt-2">看看</a>
                </div>
              </div>
            </div>
          </div>`}),i.innerHTML=o})}s();const u=document.querySelector("#logoutBtn");u.addEventListener("click",function(){localStorage.removeItem("token"),localStorage.removeItem("role"),localStorage.removeItem("userId"),location.reload(),window.location.href="https://wenjenchun.github.io/attractions-collection/index.html"});
