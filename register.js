const navBar = document.querySelector('#navBar');
// navBar.innerHTML =
// ` 
// <a class="me-3" href="/attractions-collection/login.html">登入(register)</a>
// <a class="me-3" href="/attractions-collection/register.html">註冊(register)</a>
// `;

const userName = document.querySelector("#newName");
const userEmail = document.querySelector("#newEmail");
const userPassword = document.querySelector("#newPassword");
const registerBtn = document.querySelector("#registerBtn");

// const _url = "http://localhost:3000";
const _url="https://attractions-api-jhwt.onrender.com";

// admin
// "email": "admin@mail.com",
// "password": "1234",
// "name": "June",
// "role": "admin"

// function register(){
//     console.log("hi from register");
//     axios.post(_url+"/register",{
//         "name": "June",
//         "email": "admin@mail.com",
//         "password": "1234",
//         "role": "admin"
//     }).then(function(res){
//         console.log(res.data);
//     }).catch(function(error){
//         console.log(error.response)
//     });
// };

// register();

function register(){
    axios.post(_url+"/register",{
        "name": userName.value,
        "email": userEmail.value,
        "password": userPassword.value,
        "role": "general"
        // "name": "admin",
        // "email": "admin@mail.com",
        // "password": "1234",
        // "role": "admin"
    }).then(function(res){
        console.log(res.data);
    }).catch(function(error){
        console.log(error.response)
    });
};
// register();
registerBtn.addEventListener("click", function(e){
    register();
    alert("註冊成功!");
    window.location.href = "https://wenjenchun.github.io/attractions-collection/index.html";
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