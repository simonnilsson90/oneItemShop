"use strict";

// HTML-element

const buttonEl = document.getElementById("button");
const sectionEl = document.getElementById("section");

let userAdressEl = document.getElementById("userAdress")
let userNameEl = document.getElementById("userName");
let userMailEl = document.getElementById("userMail");
let userFraktEl = document.getElementById("frakten");

//   Hämta data från Firebase och lägg upp
fetch('https://firestore.googleapis.com/v1/projects/webbutik-28aae/databases/(default)/documents/fakeStore')

.then(res=>res.json())
.then(data=>getOrders(data));
// .then(json=>console.log(json))

function getOrders(data) {

  let ordersArray = data.documents;
  
  for (let orders of ordersArray) {
  
  
  sectionEl.innerHTML += `
  

  <hr>
  <h3>Order</h3>
  <p>  Namn: ${orders.fields.name.stringValue}   </p>
  <p>  Adress: ${orders.fields.adress.stringValue}  </p>
  
  <p> Mail: ${orders.fields.mail.stringValue }  </p>
  <p> Produktid: ${orders.fields.idProduct.integerValue } </p>
  <p>  Fraktvillkor: ${orders.fields.fraktvillkor.stringValue}  </p>
  <button  onclick="deleteUser('${orders.name}')">Radera order</button>
  <button  onclick="upDate('${orders.name}')">Ändra</button>
  <br> <br>



 
      <hr>
  
  
  
  
  
  `  
  }
  }

  // --- PATCH ---
// Uppdatera befintlig användare

function upDate (name){
  console.log("Inne i upDate")

  
  let userName = userNameEl.value;
  let userAdress = userAdressEl.value;
  let userMail =  userMailEl.value;
  let userFrakt = userFraktEl.value;


  const body = JSON.stringify(
      {
        "fields":  {
                "idProduct": {
                  "integerValue": "14"
                },
                "adress": {
                  "stringValue": userAdress
                },
                "fraktvillkor": {
                  "stringValue": userFrakt
                },
                "name": {
                  "stringValue": userName
                },
                "mail": {
                  "stringValue": userMail
        }
    }
      }
    )
    
    
    
    fetch("https://firestore.googleapis.com/v1/" + name, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    })
        .then(res => res.json())
        .then(data => console.log(data));

        setTimeout(() => location.reload(), 2000);  // Ladda om sidan efter 2 sekunder (2000 millisekunder)

}











// Delete






function deleteUser (name){
    console.log("Inne i deleteUser")

    fetch("https://firestore.googleapis.com/v1/" + name, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => console.log(data));

    setTimeout(() => location.reload(), 2000);  // Ladda om sidan efter 2 sekunder (2000 millisekunder)

}



// buttonEl.addEventListener("click", upDate(orders.name));



