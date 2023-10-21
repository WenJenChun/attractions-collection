const placeName = document.querySelector('#placeName');
const placeDetail = document.querySelector('#placeDetail');
const id = location.href.split("=")[1];

const saveChangeBtn = document.querySelector('#saveChanges');
const cancelEditingBtn = document.querySelector('#cancelEditing');

// const _url="http://localhost:3000";
const _url="https://attractions-api-jhwt.onrender.com";

function getAttractionDetail() {
  axios.get(_url+"/views/"+id)
  .then(function(response){

    console.log(response.data);
    const apiData = response.data;
    placeName.value = apiData.name;
    placeDetail.textContent = apiData.description;
    
  });
}

getAttractionDetail()

cancelEditingBtn.addEventListener("click", function(){
  window.location.href = "/backboard.html";
});

function saveChanges(){
  axios.patch(`${_url}/views/${id}`,{
      "name": placeName.value,
      "description": placeDetail.value
  },{
      // headers:{
      //     "authorization": `Bearer ${token}` // Bearer是加密用
      // }
  }).then(function(res){
      console.log(res.response);
  }).catch(function(error){
      console.log(error.response)
  });
}

saveChangeBtn.addEventListener("click", function(){
  saveChanges();
  window.location.href = "/backboard.html";

});