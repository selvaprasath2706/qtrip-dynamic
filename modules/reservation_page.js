import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
try{
  let data=await fetch(config.backendEndpoint+"/reservations").then((res)=>res.json()).catch((error)=>null);
  console.log(data);
  return data;
}
catch(error){
  return null;
}
  // Place holder for functionality to work in the Stubs

}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
  if(reservations.length==0){
    document.getElementById("no-reservation-banner").style.display="block";
    document.getElementById("reservation-table-parent").style.display="none";
  
  }
  else{
    document.getElementById("no-reservation-banner").style.display="none";
    document.getElementById("reservation-table-parent").style.display="block";
  }
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  let tbody=document.getElementById("reservation-table");
  let count=reservations.length;
  console.log(reservations.length,reservations[0])
  for(let i=0;i<count;i++){
    let tr=document.createElement("tr");
    
    let transId=document.createElement("td");
    transId.innerHTML=reservations[i].id;
    let bookingName=document.createElement("td");
    bookingName.innerHTML=reservations[i].name
    let adventure=document.createElement("td");
    adventure.innerHTML=reservations[i].adventureName
    let person=document.createElement("td");
    person.innerHTML=reservations[i].person
    let date=document.createElement("td");
    const dateval = new Date(reservations[i].date);
    date.innerHTML=dateval.toLocaleDateString('en-IN');
    let price=document.createElement("td");
    price.innerHTML=reservations[i].price
    let bookingTime=document.createElement("td");
    const timeval = new Date(reservations[i].time);
    const options = { day:'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute:'numeric', second: 'numeric' }
    bookingTime.innerHTML=timeval.toLocaleDateString('en-IN', options);
    let action=document.createElement("td");
    action.setAttribute("id",reservations[i].id);
    let atag=document.createElement("a");
    atag.setAttribute("href","/pages/adventures/detail/?adventure="+reservations[i].adventure);
    atag.setAttribute("class","reservation-visit-button");
    atag.innerHTML="Visit Adventure";
    action.append(atag);
    tr.append(transId);
    tr.append(bookingName);
    tr.append(adventure)
    tr.append(person);
    tr.append(date);
    tr.append(price);
    tr.append(bookingTime)
    tr.append(action)
    tbody.append(tr);

  }
}

export { fetchReservations, addReservationToTable };
