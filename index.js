const attraction = document.querySelector('#attraction');
const _url="http://localhost:3000";
const navBar = document.querySelector('#navBar');
const greeting = document.querySelector('#greeting');
let id;


//獲取 api 資料並顯示在網頁上
function init(){
  axios.get(_url+"/views")
  .then(function(response){
    console.log(response.data);
    const apiDatas = response.data;
    let str = "";
    apiDatas.forEach(function(item){
      str += `
          <div class="col">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title text-center">${item.name}</h5>
                <p class="card-text">${item.description.slice(0,45)}...</p>
                <div class="text-center">
                  <a href="./detail.html?id=${item.id}" class="btn btn-secondary text-white mt-2">看看</a>
                  <a href="#" id="collect" data-attraction-id=${item.id} class="btn btn-secondary text-white mt-2">收藏</a>
                </div>
              </div>
            </div>
          </div>`;
    });

    attraction.innerHTML = str;
    collectAttractions();
    
  });
};

function collectAttractions(){
  const collectBtns = document.querySelectorAll('#collect');

  collectBtns.forEach(function(btn){
    btn.addEventListener("click", function(){
      const attractionId = btn.getAttribute('data-attraction-id');

      if(localStorage.getItem("token")== null){
        alert("請先登入");
        window.location.href = "http://localhost:5173/attractions-collection/pages/login.html";
      } else {

        if(btn){}



        if(btn.textContent == "收藏"){
          btn.textContent = "已收藏!"
          axios.post(_url+"/collections",{
            "viewId": attractionId,
            "userId": localStorage.getItem("userId"),
        }).then(function(res){
            console.log("response 回傳");
            console.log(res.data);
        }).catch(function(error){
            console.log("錯誤訊息");
            console.log(error.response)
        });
  
        } else {
          btn.textContent = "收藏";

        }
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
    <a class="me-3" href="/pages/backboard.html">後台</a>
    <a class="me-3" href="/pages/collections.html">我的收藏</a>
    <input id="logoutBtn" type="button" class="btn btn-secondary text-white " value="登出">
    `;
  } else {
    navBar.innerHTML =
    ` 
    <a class="me-3" href="/pages/collections.html">我的收藏</a>
    <input id="logoutBtn" type="button" class="btn btn-secondary text-white " value="登出">
    `;
  }
  const logoutBtn = document.querySelector('#logoutBtn');
  logoutBtn.addEventListener("click", function(){
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    location.reload();
    window.location.href = "http://localhost:5173/attractions-collection/pages/index.html";
  });
}