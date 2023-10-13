const attraction = document.querySelector('#attraction');
const _url="http://localhost:3000";

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
                  <a href="#" class="btn btn-secondary text-white mt-2">收藏</a>
                </div>
              </div>
            </div>
          </div>`;
    });

    attraction.innerHTML = str;
  });
};

init();
// localStorage.removeItem("token");
// console.log(localStorage.getItem("token"));
if(localStorage.getItem("token")==null){
  console.log('還沒登入');
} else {
  console.log('已登入');
}