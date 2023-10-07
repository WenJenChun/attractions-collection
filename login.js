

const userEmail = document.querySelector("#userEmail");
const userPassword = document.querySelector("#userPassword");
const loginBtn = document.querySelector("#loginBtn");
const _url = "http://localhost:3000";

// admin
// "email": "admin@mail.com",
// "password": "1234",
// "name": "June",
// "role": "admin"

console.log("hi from Log In");

function logIn(){
    axios.post(_url+"/register",{
        "name": userName.value,
        "email": userEmail.value,
        "password": userEmail.value,
        "role": "general"
    }).then(function(res){
        console.log(res.data);
    }).catch(function(error){
        console.log(error.response)
    });
};

logIn();
// registerBtn.addEventListener("click", function(e){
//     logIn();
//     alert("歡迎回來！");
//     window.location.href = "http://localhost:5173/attractions-collection/pages/index.html";
// });
