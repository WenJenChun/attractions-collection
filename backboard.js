const attractionList = document.querySelector('#attractionList');
const _url="http://localhost:3000";
const navBar = document.querySelector('#navBar');

// let deleteAttractionBtn = document.querySelector('#deleteAttraction');


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
            <td><a href="/pages/edit.html?id=${+item.id}" class="btn btn-sm btn-secondary text-white">編輯</a></td>
            <td><input id="deleteAttraction" type="button" class="btn btn-sm btn-warning text-white" value="刪除"></td>
        </tr>
    `;
    const deleteAttractionBtn = document.querySelector('#deleteAttraction');
    deleteAttractionBtn.addEventListener("click",function(){
      console.log(item.id);
    });

    });
    
    attractionList.innerHTML = str;

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
    <a class="me-3" href="/pages/like.html">我的收藏</a>
    <input id="logoutBtn" type="button" class="btn btn-secondary text-white " value="登出">
    `;
  } else {
    navBar.innerHTML =
    ` 
    <a class="me-3" href="/pages/like.html">我的收藏</a>
    <input id="logoutBtn" type="button" class="btn btn-secondary text-white " value="登出">
    `;
  }
  const logoutBtn = document.querySelector('#logoutBtn');
  logoutBtn.addEventListener("click", function(){
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    location.reload();
  });
}

deleteAttractionBtn.addEventListener("click", function(e){
  console.log("按");
  axios.delete(`${_url}/views/${item.id}`)
  .then(function(res){
      alert("刪除成功！");
  })
});