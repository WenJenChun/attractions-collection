

const userEmail = document.querySelector("#userEmail");
const userPassword = document.querySelector("#userPassword");
const loginBtn = document.querySelector("#loginBtn");
const _url = "http://localhost:3000";
let token;
let role;
let userId;

const testArea = document.querySelector("#testArea");

// admin
// "email": "admin@mail.com",
// "password": "1234",
// "name": "admin",
// "role": "admin"

console.log("hi from Log In");

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
    window.location.href = "http://localhost:5173/attractions-collection/pages/index.html";
});
