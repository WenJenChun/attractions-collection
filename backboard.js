const isLogIn = localStorage.getItem("token") !== null;
const isAdmin = localStorage.getItem("role") === "admin";
const headerContent = document.getElementById('header-content');

headerContent.innerHTML = `
<%- include('./layout/header.ejs', { isLogIn: ${isLogIn}, isAdmin: ${isAdmin} }); -%>
`;
const attractionList = document.querySelector('#attractionList');
// const _url="http://localhost:3000";
const _url="https://attractions-api-jhwt.onrender.com";
const navBar = document.querySelector('#navBar');

//獲取 api 資料並顯示在網頁上
function init(){
  axios.get(_url+"/views")
  .then(function(response){
    console.log(response.data);
    const apiDatas = response.data;
    let str = "";
    apiDatas.forEach(function(item){
    str += `
        <tr>
            <th scope="row">${item.id}</th>
            <td>${item.name}</td>
            <td>${item.description}</td>
            <td>
              <a href="/attractions-collection/edit.html?id=${item.id}" class="btn btn-sm btn-secondary text-white">編輯</a>
              <input data-attraction-id=${item.id} type="button" class="mt-1 deleteAttraction btn btn-sm btn-warning text-white" value="刪除">
            </td>
        </tr>`;
    });
    attractionList.innerHTML = str;

    const deleteAttractionBtns = document.querySelectorAll('.deleteAttraction');

    deleteAttractionBtns.forEach(function(btn) {
      btn.addEventListener("click", function () {
        const attractionId = btn.getAttribute('data-attraction-id');
        console.log("按"+attractionId);
        axios.delete(`${_url}/views/${attractionId}`)
          .then(function (res) {
            alert("刪除成功！");
            location.reload();
          })
          .catch(function (error) {
            console.error("刪除失敗：" + error);
          });
      });
    });
    

  });
};

init();



if(localStorage.getItem("token")==null){
    console.log('還沒登入');
} else {
  console.log('已登入');
  if(localStorage.getItem("role")=="admin"){
    navBar.innerHTML =
    ` 
    <a class="me-3" href="/backboard.html">後台</a>
    <a class="me-3" href="/collections.html">我的收藏</a>
    <input id="logoutBtn" type="button" class="btn btn-secondary text-white " value="登出">
    `;
  } else {
    navBar.innerHTML =
    ` 
    <a class="me-3" href="/collections.html">我的收藏</a>
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
