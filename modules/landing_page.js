import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  //Updates the DOM with the cities
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  
 document.getElementById("empty").innerHTML="Data not Available"
}


//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  let data=await fetch(config.backendEndpoint+"/cities").then((res)=>res.json()).catch((error)=>null);
  return data;
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  // data
  let parent=document.getElementById("data");
  let div=document.createElement("div");
  let atag=document.createElement("a");
  atag.setAttribute("id",id);
  atag.setAttribute("href","pages/adventures/?city="+id);
  div.setAttribute("class","col-12 col-sm-6 col-lg-3 mb-4");
  div.append(atag);
  let tile=document.createElement("div");
  tile.setAttribute("class","tile");
  let img=document.createElement("img");
  img.setAttribute("src",image);
  let tiletext=document.createElement("div");
  tiletext.setAttribute("class","tile-text text-center");
  let h5=document.createElement("h5");
  h5.innerHTML=city;
  let p=document.createElement("p");
  p.innerHTML=description;
  tiletext.append(h5,p);
  tile.append(img);
  tile.append(tiletext);
  atag.append(tile);
  div.append(atag);
  parent.append(div);
 
}
async function handleChangeCity(event){
  let cities = await fetchCities();

    //Updates the DOM with the cities
    if(event.target.value){
      let citylen=cities.length
      let i=0
      for(i;i<citylen;i++){
        if(cities[i].city==event.target.value){
         document.getElementById("data").innerHTML="";
         document.getElementById("empty").innerHTML=""
          addCityToDOM(cities[i].id, cities[i].city, cities[i].description, cities[i].image);       
          break
        }
      }
      if(i==citylen){
       
        document.getElementById("data").innerHTML=""
        document.getElementById("empty").innerHTML="Data not Available"
       
      }
    }else{
      document.getElementById("empty").innerHTML=""
      document.getElementById("data").innerHTML=""
      cities.forEach((key) => {
        addCityToDOM(key.id, key.city, key.description, key.image);
      });
    }
  

}

export { init, fetchCities, addCityToDOM,handleChangeCity };
