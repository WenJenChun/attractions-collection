const placeName = document.querySelector('#placeName');
const placeDetail = document.querySelector('#placeDetail');
const id = location.href.split("=")[1];

const _url="http://localhost:3000";

function getAttractionDetail() {
  axios.get(_url+"/views/"+id)
  .then(function(response){

    console.log(response.data);
    const apiData = response.data;
    placeName.textContent = apiData.name;
    placeDetail.textContent = apiData.description;

  });
}

getAttractionDetail()