const isLogIn = localStorage.getItem("token") !== null;
const isAdmin = localStorage.getItem("role") === "admin";
const userId = localStorage.getItem("userId");

const navBar = document.querySelector('#navBar');
let viewInfo;
const placeName = document.querySelector('#placeName');
const placeDetail = document.querySelector('#placeDetail');
const viewId = location.href.split("=")[1];
const collectBtn = document.querySelector('#collectBtn');

let userCollects;
let collectId;


const _url="http://localhost:3000";
// const _url="https://attractions-api-jhwt.onrender.com";


//1. 獲取景點資訊
//2. 判斷用戶是否登入
//   已登入：抓取用戶已收藏資料 > 比對 > btn 文字&navBar 
//   未登入：btn 文字 & navBar

function getViewInfo(){
  axios.get(_url+"/views/"+viewId)
  .then(function(response){
    const apiData = response.data;
    placeName.textContent = apiData.name;
    placeDetail.textContent = apiData.description;
    viewInfo = apiData;
    console.log("======");
    console.log(viewInfo);
    console.log("======");
  });
}

getViewInfo();

async function checkLogIn(){
  if(!isLogIn){
    navBar.innerHTML =
      ` 
      <a class="me-3" href="/attractions-collection/login.html">登入</a>
      <a class="me-3" href="/attractions-collection/register.html">註冊</a>
      `;
      collectBtn.addEventListener("click", function(){
        alert("請先登入!");
        window.location.href = "https://wenjenchun.github.io/attractions-collection/login.html";
      });
      collectBtn.textContent = "尚未收藏";
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

    //抓取用戶已收藏資料
    await getUserCollection();
    //比對 
    const isCollected = userCollects.find(viewInfo => viewInfo.viewId === viewId);
    if(isCollected){
      //取該景點在 userCollects 的 id 
      collectId=isCollected.id;
      collectBtn.textContent = "已收藏";
      console.log('已收藏，id='+collectId);
    } else {
      collectBtn.textContent = "尚未收藏";
      console.log('還沒收');
    }


  }
}

checkLogIn();


//////////////////////////////////////////////////////////////

//獲取用戶收藏資訊
function getUserCollection() {
  return axios.get(_url + "/collections?userId=" + userId)
    .then(function (response) {
      userCollects = response.data;
    });
}

