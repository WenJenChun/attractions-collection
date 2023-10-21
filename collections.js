const collections = document.querySelector('#collections');
// const _url="http://localhost:3000";
const _url="https://attractions-api-jhwt.onrender.com";
const navBar = document.querySelector('#navBar');
let id = localStorage.getItem("userId");


//獲取 api 資料並顯示在網頁上
function init(){
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
                </div>
              </div>
            </div>
          </div>`;
    });

    collections.innerHTML = str;
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
    window.location.href = "https://wenjenchun.github.io/attractions-collection/index.html";
  });
}