import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  return params.get('city');
 
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  let data=await fetch(config.backendEndpoint+"/adventures?city="+city).then((res)=>res.json()).catch((error)=>null);
  return data;
} 

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let parentDiv=document.getElementById("data");
  let count=adventures.length;
  for(let i=0;i<count;i++){
  let cardParent=document.createElement("div");
  cardParent.setAttribute("class","col-6 col-md-3 mb-4 position-relative");
   
  let atag=document.createElement("a");
  atag.setAttribute("id",adventures[i].id);
  atag.setAttribute("href","./detail/?adventure="+adventures[i].id);
  let card=document.createElement("div");
  card.setAttribute("class","activity-card ");
  let img=document.createElement("img");
  img.setAttribute("width","100%")
  img.setAttribute("src",adventures[i].image);
  let categoryBanner=document.createElement("div");
  categoryBanner.setAttribute("class","category-banner");
  categoryBanner.innerHTML=adventures[i].category;
  card.append(img);
  atag.append(categoryBanner)
  //currency
  let currencyDetails=document.createElement("div");
  currencyDetails.setAttribute("class","d-flex flex-row justify-content-between p-2")
  let p1=document.createElement("p");
  p1.innerHTML=adventures[i].name;
  let p2=document.createElement("p");
  p2.innerHTML=	"&#8377;"+adventures[i].costPerHead;
  currencyDetails.append(p1,p2);

  //Duration 
  let durationDetails=document.createElement("div");
  durationDetails.setAttribute("class","d-flex flex-sm-row justify-content-between p-2");
  let p3=document.createElement("p");
  p3.innerHTML="Duration";
  let p4=document.createElement("p");

  p4.innerHTML=+adventures[i].duration+" Hours";
  durationDetails.append(p3,p4);
  
  card.append(currencyDetails,durationDetails)
  atag.append(card);
  cardParent.append(atag);
  
  parentDiv.append(cardParent);
  }


  
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  // console.log(low,high)
  let durationsortedarr=list.filter(function (e){
    return e.duration>=low && e.duration<=high;
  })
  return durationsortedarr;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let sortedarr=list.filter(function(e){
    return categoryList.includes(e.category);
  })
  
  return sortedarr;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
    // console.log(list,filters)
  if(filters.category!=0){
      list=filterByCategory(list,filters.category)
      generateFilterPillsAndUpdateDOM(filters)
    }  
    // console.log(filters.duration)
  if(filters.duration){
    const myArray = filters.duration.split("-");
    list=filterByDuration(list,myArray[0],myArray[1]);
   }
  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem('filters', JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  let filters=JSON.parse(window.localStorage.getItem('filters'));
  // Place holder for functionality to work in the Stubs
  return filters;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM
function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  document.getElementById("category-list").textContent = "";
  let catlist=document.getElementById("category-list");
  let count=filters.category.length;
  // console.log(count)
  for(let i=0;i<count;i++){
    let p=document.createElement("p");
    p.setAttribute("class","category-filter")
    p.innerHTML=filters.category[i];
    catlist.append(p);
  }
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
