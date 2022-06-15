import config from "../conf/index.js";


function routeToKart(){
  // http://192.168.10.108:8081/  
  // window.open(
  //   "http://192.168.10.108:8081/adventures/"+getAdventureIdFromURL(window.location.search), "_blank");
  
  window.open(
  "https://qkart-prasath.netlify.app/adventures/"+getAdventureIdFromURL(window.location.search), "_blank");
}


//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  console.log(search)
  const params=new URLSearchParams(search);
  return params.get('adventure');
 
  // Place holder for functionality to work in the Stubs
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
  // Place holder for functionality to work in the Stubs
  let data=await fetch(config.backendEndpoint+"/adventures/detail?adventure="+adventureId).then((res)=>res.json()).catch((error)=>null);
  
  return data;
}
catch(err){
  return null;
}
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
 
  let advName=document.getElementById("adventure-name");
  advName.setAttribute("class","carousel slide");
  advName.innerHTML=adventure.name
  let advSubtitle=document.getElementById("adventure-subtitle");
  advSubtitle.innerHTML=adventure.subtitle;
  let advContent=document.getElementById("adventure-content");
  advContent.innerHTML=adventure.content;
  
  let photogallery=document.getElementById("photo-gallery");
  let count=adventure.images.length;

  for(let i=0;i<count;i++){
    let imgParent=document.createElement("div");
    let imgElement=document.createElement("img");
    imgElement.setAttribute("class","activity-card-image");
    imgElement.setAttribute("src",adventure.images[i]);
    imgParent.append(imgElement);
    photogallery.append(imgParent)
  }

} 

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
 document.getElementById("photo-gallery").innerHTML="";
 let photogallery=document.getElementById("photo-gallery");
 photogallery.setAttribute("class","carousel slide");
 photogallery.setAttribute("data-bs-ride","carousel");
 let carIndi=document.createElement("div");
 carIndi.setAttribute("class","carousel-indicators")
 let imglen=images.length
 for(let i=0;i<imglen;i++){
  let btnindi=document.createElement("button");
  btnindi.setAttribute("data-bs-target","#photo-gallery");
  btnindi.setAttribute("data-bs-slide-to",i);
  if (i==0){
    btnindi.setAttribute("class","active");
    btnindi.setAttribute("aria-current","true")
  }
  carIndi.append(btnindi)
 }
//  carIndi.innerHTML=` <button type="button" data-bs-target="#photo-gallery" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
//  <button type="button" data-bs-target="#photo-gallery" data-bs-slide-to="1" aria-label="Slide 2"></button>
//  <button type="button" data-bs-target="#photo-gallery" data-bs-slide-to="2" aria-label="Slide 3"></button>`;
photogallery.append(carIndi)
 let photoParent=document.createElement("div");
  photoParent.setAttribute("class","carousel-inner");
  let count=images.length;

  for(let i=0;i<count;i++){
    let imgParent=document.createElement("div");
    
    if(i==0){
      imgParent.setAttribute("class","carousel-item active")
    let imgElement=document.createElement("img");
    imgElement.setAttribute("class","activity-card-image");
    imgElement.setAttribute("src",images[i]);
    imgParent.append(imgElement);
  }
    else{
      imgParent.setAttribute("class","carousel-item ")
      let imgElement=document.createElement("img");
      imgElement.setAttribute("class","activity-card-image");
      imgElement.setAttribute("src",images[i]);
    
      imgParent.append(imgElement);
    }
    photoParent.append(imgParent)
  }

  photogallery.append(photoParent)
  let text=`<button class="carousel-control-prev" type="button" data-bs-target="#photo-gallery" data-bs-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#photo-gallery" data-bs-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>
</button>`;
photogallery.innerHTML+=text;
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available){
  document.getElementById("reservation-panel-sold-out").style.display="none";
  document.getElementById("reservation-panel-available").style.display="block";
  let resCost=document.getElementById("reservation-person-cost");
  resCost.innerHTML=adventure.costPerHead;
}
else{
  document.getElementById("reservation-panel-sold-out").style.display="block";
  document.getElementById("reservation-panel-available").style.display="none";
  
}
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById("reservation-cost").innerHTML=adventure.costPerHead*persons;
}



const validateResponse = (errored, response, couldNot) => {
  if (errored) {
    // message.error(
    //   `Could not ${couldNot}. Check that the backend is running, reachable and returns valid JSON.`
    // );
    return false;
  }
  if (response.message) {
    // message.error(response.message);
    return false;
  }
  return true;
};

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let form =document.getElementById("myForm");
  form.addEventListener("submit",function(event){
  event.preventDefault()
  let name = form.elements["name"].value;
  let date=form.elements["date"].value;
  let person=form.elements["person"].value;
  let cost=parseInt(document.getElementById("reservation-cost").innerText);
  console.log(cost)
  let reservations={
    name:name,
    date:date,
    person:person,
    adventure:adventure.id
  };


  var options={
    key:"rzp_test_r5YSzVJZPC3wxh",
    key_secret:"FmLRPUjsVe1Swh3gAisYVLhw",
    amount:cost*100,
    currency:"INR",
    name:"QTRIP-KART",
    description:"Payment gateway",
    handler:(response)=>{
      (async () => {
        let response = {};
        let errored = false;

        response =  await fetch(config.backendEndpoint+"/reservations/new/", {
          method: "POST",
          body: JSON.stringify(reservations),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }).then((response) =>{
          if (!response.ok) {
            throw Error(response.status);
           }
           return response.json();
        }).then(update => {
          alert("success");
          window.location.reload()
          }).catch(e => {
          alert("failed");
          });
        //  try {
        //   response = await fetch(`${config.endpoint}/cart/checkout`, {
        //     method: "PUT",
        //     headers: {
        //       Authorization: `Bearer ${localStorage.getItem("token")}`,
        //       "Content-Type": "application/json",
        //     },
        //   });
        // } catch (e) {
        //   errored = true;
        //   console.log(e);
        // }
        
        let data;
        if (response.status !== 204) {
          data = await response.json();
        }
        if (response.status === 204 || validateResponse(errored, data)) {
          window.alert("success")
          }

    })().catch(err => {
        console.error(err);
    });
      
      
    },
    prefill:{
      name:"Selva Prasath",
      email:"selvaprasath.22it@licet.ac.in",
      contact:"8098162758",
    },
    notes:{
      address:"Razorpay Corp"
    },
    theme:{
      color:"#3399cc"
    }
  }
  var pay= new window.Razorpay(options)

  // let reservations={
  //   name:name,
  //   date:date,
  //   person:person,
  //   adventure:adventure.id
  // };
  console.log(reservations.date
    )
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd ;
console.log(today)
  if(reservations.date>=today){
    document.getElementById("notify_date_error").innerHTML=""

    pay.open()
  }
  else{
    document.getElementById("notify_date_error").innerHTML="you can book only for upcomming dates"
  }
 


   
})
 
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
    document.getElementById("reserved-banner").style.display="block";
  }
  else{
    document.getElementById("reserved-banner").style.display="none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
  routeToKart
};
