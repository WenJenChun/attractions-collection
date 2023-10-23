const navBar = document.querySelector('#navBar');
// navBar.innerHTML =
// ` 
// <a class="me-3" href="/attractions-collection/login.html">登入</a>
// <a class="me-3" href="/attractions-collection/register.html">註冊</a>
// `;

const userEmail = document.querySelector("#userEmail");
const userPassword = document.querySelector("#userPassword");
const loginBtn = document.querySelector("#loginBtn");

const _url = "http://localhost:3000";
// const _url="https://attractions-api-jhwt.onrender.com";
let token;
let role;
let userId;

// admin
// "email": "admin@mail.com",
// "password": "1234",
// "name": "admin",
// "role": "admin"



function logIn(){
    axios.post(_url+"/login",{
        "email": userEmail.value,
        "password": userPassword.value,
        // "email": "admin@mail.com",
        // "password": "1234"
    }).then(function(res){
        console.log("response 回傳");
        console.log(res.data);
        token = res.data.accessToken;
        role = res.data.user.role;
        userId = res.data.user.id;
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("userId", userId);
    }).catch(function(error){
        console.log("錯誤訊息");
        console.log(error.response)
    });
};


loginBtn.addEventListener("click", function(e){
    logIn();
    alert("歡迎回來！");
    // window.location.href = "https://wenjenchun.github.io/attractions-collection/index.html";
    window.location.href = "http://localhost:5173/attractions-collection/pages/index.html";

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
    //   const logoutBtn = document.querySelector('#logoutBtn');
  
    //   logoutBtn.addEventListener("click", function(){
    //     localStorage.removeItem("token");
    //     localStorage.removeItem("role");
    //     localStorage.removeItem("userId");
    //     location.reload();
    //     window.location.href = "https://wenjenchun.github.io/attractions-collection/index.html";
    //   });
    }
  }
  
  checkLogIn();
