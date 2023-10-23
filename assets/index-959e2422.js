import"./main-1da5e8c0.js";const a=localStorage.getItem("token")!==null,i=localStorage.getItem("role")==="admin",r=document.getElementById("header-content");r.innerHTML=`
<%- include('./layout/header.ejs', { isLogIn: ${a}, isAdmin: ${i} }); -%>
`;const s=document.querySelector("#attraction"),d="https://attractions-api-jhwt.onrender.com",n=document.querySelector("#navBar"),u=document.querySelector("#greeting");let c;function g(){axios.get(d+"/views").then(function(t){console.log(t.data);const l=t.data;let o="";l.forEach(function(e){o+=`
          <div class="col-6 mt-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title text-center">${e.name}</h5>
                <p class="card-text">${e.description.slice(0,45)}...</p>
                <div class="text-center">
                  <a href="./detail.html?id=${e.id}" class="btn btn-secondary text-white mt-2">看看</a>
                </div>
              </div>
            </div>
          </div>`}),s.innerHTML=o,m()})}function m(){c=document.querySelectorAll("#collect"),c.forEach(function(t){t.addEventListener("click",function(){t.getAttribute("data-attraction-id"),localStorage.getItem("token")==null?(alert("請先登入"),window.location.href="https://wenjenchun.github.io/attractions-collection/login.html"):console.log(t)})})}g();localStorage.getItem("token")==null?console.log("還沒登入"):(console.log("已登入"),localStorage.getItem("userId"),u.textContent="把喜歡的景點都收藏起來！",localStorage.getItem("role")=="admin"?n.innerHTML=` 
    <a class="me-3" href="/attractions-collection/backboard.html">後台</a>
    <a class="me-3" href="/attractions-collection/collections.html">我的收藏</a>
    <input id="logoutBtn" type="button" class="btn btn-secondary text-white " value="登出">
    `:n.innerHTML=` 
    <a class="me-3" href="/attractions-collection/collections.html">我的收藏</a>
    <input id="logoutBtn" type="button" class="btn btn-secondary text-white " value="登出">
    `,document.querySelector("#logoutBtn").addEventListener("click",function(){localStorage.removeItem("token"),localStorage.removeItem("role"),localStorage.removeItem("userId"),location.reload(),window.location.href="https://wenjenchun.github.io/attractions-collection/index.html"}));
