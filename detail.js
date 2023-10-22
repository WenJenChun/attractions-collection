const placeName = document.querySelector('#placeName');
const placeDetail = document.querySelector('#placeDetail');
const viewId = location.href.split("=")[1];
const collectBtn = document.querySelector('#collectBtn');
const userId = localStorage.getItem("userId");
let userCollects;
let collectId;


// const _url="http://localhost:3000";
const _url="https://attractions-api-jhwt.onrender.com";


//獲取用戶收藏資訊
function getUserCollection() {
  return axios.get(_url + "/collections?userId=" + userId)
    .then(function (response) {
      userCollects = response.data;
    });
}

//獲取用戶收藏資訊後，獲取景點詳細資訊
//兩者比對資訊判斷按鈕文字是已收藏或尚未收藏
async function getAttractionDetail() {
  await getUserCollection();
  console.log(userCollects);


  axios.get(_url+"/views/"+viewId)
  .then(function(response){
    const apiData = response.data;
    placeName.textContent = apiData.name;
    placeDetail.textContent = apiData.description;

    //比對 viewId 是否在 userCollects (箭頭寫法&完整寫法)
    const isCollected = userCollects.find(obj => obj.viewId === viewId); 
    // const isCollected = userCollects.find(function(obj) {
    //   return obj.viewId === viewId;
    // });

    if(isCollected){
      //取該景點在 userCollects 的 id 
      collectId=isCollected.id;
      collectBtn.textContent = "已收藏";
      console.log('已收藏，id='+collectId);
    } else {
      collectBtn.textContent = "尚未收藏";
      console.log('還沒收');
    }

  });
}

getAttractionDetail();

collectBtn.addEventListener("click", function(){
  if(localStorage.getItem("token")==null){
    alert("請先登入!");
    window.location.href = "https://wenjenchun.github.io/attractions-collection/login.html";
  }

  if(collectBtn.textContent =="尚未收藏"){
    collectBtn.textContent ="已收藏!"
    axios.post(_url+"/collections",{
      "viewId": viewId,
      "userId": localStorage.getItem("userId"),
  }).then(function(res){
      console.log("response 回傳");
      console.log(res.data);
  }).catch(function(error){
      console.log("錯誤訊息");
      console.log(error.response)
  });
  } else {
    //這邊是已經收藏要改為「尚未收藏」
    collectBtn.textContent = "尚未收藏";
    axios.delete(`${_url}/collections/${collectId}`)
    .then(function(res){
      console.log("response 回傳");
      console.log(res.data);
  }).catch(function(error){
      console.log("錯誤訊息");
      console.log(error.response)
  });

  }
});

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