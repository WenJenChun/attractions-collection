const isLogIn = localStorage.getItem("token") !== null;
const isAdmin = localStorage.getItem("role") === "admin";
const headerContent = document.getElementById('header-content');

headerContent.innerHTML = `
<%- include('./layout/header.ejs', { isLogIn: ${isLogIn}, isAdmin: ${isAdmin} }); -%>
`;
const placeName = document.querySelector('#placeName');
const placeDetail = document.querySelector('#placeDetail');
const id = location.href.split("=")[1];

const saveChangeBtn = document.querySelector('#saveChanges');
const cancelEditingBtn = document.querySelector('#cancelEditing');

// const _url="http://localhost:3000";
const _url="https://attractions-api-jhwt.onrender.com";
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