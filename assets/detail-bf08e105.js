import"./main-e5116f8e.js";const r=document.querySelector("#placeName"),g=document.querySelector("#placeDetail"),l=location.href.split("=")[1],e=document.querySelector("#collectBtn"),u=localStorage.getItem("userId");let n,c;const o="http://localhost:3000";function d(){return axios.get(o+"/collections?userId="+u).then(function(t){n=t.data})}async function m(){await d(),console.log(n),axios.get(o+"/views/"+l).then(function(t){const a=t.data;r.textContent=a.name,g.textContent=a.description;const s=n.find(i=>i.viewId===l);s?(c=s.id,e.textContent="已收藏",console.log("已收藏，id="+c)):(e.textContent="尚未收藏",console.log("還沒收"))})}m();e.addEventListener("click",function(){localStorage.getItem("token")==null&&(alert("請先登入!"),window.location.href="http://localhost:5173/attractions-collection/pages/login.html"),e.textContent=="尚未收藏"?(e.textContent="已收藏!",axios.post(o+"/collections",{viewId:l,userId:localStorage.getItem("userId")}).then(function(t){console.log("response 回傳"),console.log(t.data)}).catch(function(t){console.log("錯誤訊息"),console.log(t.response)})):(e.textContent="尚未收藏",axios.delete(`${o}/collections/${c}`).then(function(t){console.log("response 回傳"),console.log(t.data)}).catch(function(t){console.log("錯誤訊息"),console.log(t.response)}))});localStorage.getItem("token")==null?console.log("還沒登入"):(console.log("已登入"),localStorage.getItem("role")=="admin"?navBar.innerHTML=` 
    <a class="me-3" href="/pages/backboard.html">後台</a>
    <a class="me-3" href="/pages/collections.html">我的收藏</a>
    <input id="logoutBtn" type="button" class="btn btn-secondary text-white " value="登出">
    `:navBar.innerHTML=` 
    <a class="me-3" href="/pages/collections.html">我的收藏</a>
    <input id="logoutBtn" type="button" class="btn btn-secondary text-white " value="登出">
    `,document.querySelector("#logoutBtn").addEventListener("click",function(){localStorage.removeItem("token"),localStorage.removeItem("role"),localStorage.removeItem("userId"),location.reload(),window.location.href="http://localhost:5173/attractions-collection/pages/index.html"}));
