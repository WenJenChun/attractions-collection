const attraction = document.querySelector('#attraction');
// const _url="http://localhost:3000";
const _url="https://attractions-api-jhwt.onrender.com";

const navBar = document.querySelector('#navBar');
const greeting = document.querySelector('#greeting');
let id;
let collectBtns;



//是否登入
//否 - 顯示所有資料，button 皆顯示 收藏
//是 - 顯示所有資料，已收藏的 button 顯示「已收藏」，否則顯示「收藏」

//獲取 api 資料並顯示在網頁上
function init(){
  axios.get(_url+"/views")
  .then(function(response){
    console.log(response.data);
    const apiDatas = response.data;
    let str = "";
    apiDatas.forEach(function(item){
      str += `
          <div class="col-6 mt-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title text-center">${item.name}</h5>
                <p class="card-text">${item.description.slice(0,45)}...</p>
                <div class="text-center">
                  <a href="./detail.html?id=${item.id}" class="btn btn-secondary text-white mt-2">看看</a>
                </div>
              </div>
            </div>
          </div>`;
    });

    attraction.innerHTML = str;
    
    collectAttractions();
    
  });
};

// <a href="#" id="collect" data-attraction-id=${item.id} class="btn btn-secondary text-white mt-2">收藏</a>

//判斷是否登入

function collectAttractions(){
  collectBtns = document.querySelectorAll('#collect');
  collectBtns.forEach(function(btn){
    btn.addEventListener("click", function(){
      const attractionId = btn.getAttribute('data-attraction-id');

      if(localStorage.getItem("token")== null){
        alert("請先登入");
        window.location.href = "/login.html";
      } else {
      //這邊要比對 user 本身的收藏景點和既有的景點
        console.log(btn);

      }
    });
  });
};

function getUserCollects(){
  axios.get(_url+"/collections?userId="+id+"&_expand=view")
  .then(function(response){
    console.log(response.data);
    const apiDatas = response.data;
    let str = "";
    apiDatas.forEach(function(item){
      str += `
          <div class="col">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title text-center">${item.view.name}</h5>
                <p class="card-text">${item.view.description.slice(0,45)}...</p>
                <div class="text-center">
                  <a href="./detail.html?id=${item.view.id}" class="btn btn-secondary text-white mt-2">看看</a>
                  <a href="#" class="btn btn-secondary text-white mt-2">已收藏</a>
                </div>
              </div>
            </div>
          </div>`;
    });

    collections.innerHTML = str;
  });
}

init();


// collectAttractions();
// localStorage.removeItem("token");
// console.log(localStorage.getItem("token"));
if(localStorage.getItem("token")==null){
  console.log('還沒登入');
} else {
  console.log('已登入');
  id=localStorage.getItem("userId");
  greeting.textContent = "把喜歡的景點都收藏起來！";
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
    window.location.href = "/index.html";
  });
}