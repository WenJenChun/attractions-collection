const isLogIn = localStorage.getItem("token") !== null;
const isAdmin = localStorage.getItem("role") === "admin";
const userId = localStorage.getItem("userId");

const navBar = document.querySelector('#navBar');

const placeName = document.querySelector('#placeName');
const placeDetail = document.querySelector('#placeDetail');
const id = location.href.split("=")[1];

const saveChangeBtn = document.querySelector('#saveChanges');
const cancelEditingBtn = document.querySelector('#cancelEditing');

const _url="http://localhost:3000";
// const _url="https://attractions-api-jhwt.onrender.com";
const token = localStorage.getItem("token");

cancelEditingBtn.addEventListener("click", function(){
  window.location.href = "https://wenjenchun.github.io/attractions-collection/backboard.html";
});

function addAttraction(){
  axios.post(`${_url}/views`,{
      "name": placeName.value,
      "description": placeDetail.value
  },{
    headers:{
        "authorization": `Bearer ${token}` // Bearer是加密用
    }
}).then(function(res){
      console.log(res.response);
  }).catch(function(error){
      console.log(error.response)
  });
}

saveChangeBtn.addEventListener("click", function(){
  addAttraction();
  window.location.href = "https://wenjenchun.github.io/attractions-collection/backboard.html";
});

function checkLogIn(){
  if(!isLogIn){
    navBar.innerHTML =
      ` 
      <a class="me-3" href="/attractions-collection/login.html">登入</a>
      <a class="me-3" href="/attractions-collection/register.html">註冊</a>
      `;
  } else {
    if(isAdmin){
      navBar.innerHTML =
      ` 
      <a class="me-3" href="/attractions-collection/backboard.html">後台</a>
      <a class="me-3" href="/attractions-collection/collections.html">我的收藏</a>
      <input id="logoutBtn" type="button" class="btn btn-secondary text-white " value="登出">
      `;
    } else {
      navBar.innerHTML =
      ` 
      <a class="me-3" href="/attractions-collection/collections.html">我的收藏</a>
      <input id="logoutBtn" type="button" class="btn btn-secondary text-white " value="登出">
      `;
    }
    const logoutBtn = document.querySelector('#logoutBtn');

    logoutBtn.addEventListener("click", function(){
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userId");
      location.reload();
      window.location.href = "https://wenjenchun.github.io/attractions-collection/index.html";
    });
  }
}

checkLogIn();