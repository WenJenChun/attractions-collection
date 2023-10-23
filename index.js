const isLogIn = localStorage.getItem("token") !== null;
const isAdmin = localStorage.getItem("role") === "admin";
const userId = localStorage.getItem("userId");

const navBar = document.querySelector('#navBar');
const greeting = document.querySelector('#greeting');
const attraction = document.querySelector('#attraction');

// const _url="http://localhost:3000";
const _url="https://attractions-api-jhwt.onrender.com";

let collectBtns;

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
    
    // collectAttractions();
    
  });
};


//判斷是否登入

// function collectAttractions(){
//   collectBtns = document.querySelectorAll('#collect');
//   collectBtns.forEach(function(btn){
//     btn.addEventListener("click", function(){
//       const attractionId = btn.getAttribute('data-attraction-id');

//       if(!isLogIn){
//         alert("請先登入");
//         window.location.href = "https://wenjenchun.github.io/attractions-collection/login.html";
//       } else {
      

//       }
//     });
//   });
// };

// function getUserCollects(){
//   axios.get(_url+"/collections?userId="+id+"&_expand=view")
//   .then(function(response){
//     console.log(response.data);
//     const apiDatas = response.data;
//     let str = "";
//     apiDatas.forEach(function(item){
//       str += `
//           <div class="col">
//             <div class="card">
//               <div class="card-body">
//                 <h5 class="card-title text-center">${item.view.name}</h5>
//                 <p class="card-text">${item.view.description.slice(0,45)}...</p>
//                 <div class="text-center">
//                   <a href="./detail.html?id=${item.view.id}" class="btn btn-secondary text-white mt-2">看看</a>
//                   <a href="#" class="btn btn-secondary text-white mt-2">已收藏</a>
//                 </div>
//               </div>
//             </div>
//           </div>`;
//     });

//     collections.innerHTML = str;
//   });
// }

init();


// collectAttractions();
// localStorage.removeItem("token");
// console.log(localStorage.getItem("token"));


function checkLogIn(){
  if(!isLogIn){
    console.log('還沒登入7');
    navBar.innerHTML =
      ` 
      <a class="me-3" href="/attractions-collection/login.html">登入</a>
      <a class="me-3" href="/attractions-collection/register.html">註冊</a>
      `;
  } else {
    console.log('已登入');
    
    greeting.textContent = "把喜歡的景點都收藏起來！";
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
  }
}

checkLogIn();