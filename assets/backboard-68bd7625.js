import"./main-4e50fb73.js";const r=document.querySelector("#attractionList"),c="https://attractions-api-jhwt.onrender.com",l=document.querySelector("#navBar");function s(){axios.get(c+"/views").then(function(e){console.log(e.data);const i=e.data;let o="";i.forEach(function(t){o+=`
        <tr>
            <th scope="row">${t.id}</th>
            <td>${t.name}</td>
            <td>${t.description}</td>
            <td>
              <a href="/attractions-collection/edit.html?id=${t.id}" class="btn btn-sm btn-secondary text-white">編輯</a>
              <input data-attraction-id=${t.id} type="button" class="mt-1 deleteAttraction btn btn-sm btn-warning text-white" value="刪除">
            </td>
        </tr>`}),r.innerHTML=o,document.querySelectorAll(".deleteAttraction").forEach(function(t){t.addEventListener("click",function(){const n=t.getAttribute("data-attraction-id");console.log("按"+n),axios.delete(`${c}/views/${n}`).then(function(a){alert("刪除成功！"),location.reload()}).catch(function(a){console.error("刪除失敗："+a)})})})})}s();localStorage.getItem("token")==null?console.log("還沒登入"):(console.log("已登入"),localStorage.getItem("role")=="admin"?l.innerHTML=` 
    <a class="me-3" href="/backboard.html">後台</a>
    <a class="me-3" href="/collections.html">我的收藏</a>
    <input id="logoutBtn" type="button" class="btn btn-secondary text-white " value="登出">
    `:l.innerHTML=` 
    <a class="me-3" href="/collections.html">我的收藏</a>
    <input id="logoutBtn" type="button" class="btn btn-secondary text-white " value="登出">
    `,document.querySelector("#logoutBtn").addEventListener("click",function(){localStorage.removeItem("token"),localStorage.removeItem("role"),localStorage.removeItem("userId"),location.reload(),window.location.href="https://wenjenchun.github.io/attractions-collection/index.html"}));
