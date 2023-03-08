"use strict";

// HTML:element

let fakeStoreEl = document.getElementById("fakeStore");
let userAdressEl = document.getElementById("userAdress")
let userNameEl = document.getElementById("userName");
let userMailEl = document.getElementById("userMail");
let userFraktEl = document.getElementById("frakten");
let names = [];
const messageEl = document.getElementById("message");
const deleteMessageEl = document.getElementById("deleteMessage");
const productIdEl = document.getElementById("productId");
const messageIdEl = document.getElementById("messageId");
let idEl = document.getElementById("id");

const listEl = document.getElementById("list");
const submitButtonEl = document.getElementById("submitButton");

let sectionEl = document.getElementById("section");
let testEl = document.getElementById("test")
let testh2El = document.getElementById("testh2")

const h1El = document.getElementById("h1");




// Hämta data från Fakestoreapi
fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
       //     .then(data=>getData(data));
            .then(data=>getData(data));

           // function getData(jsonData) {
           
           
           function getData(getData) {


                console.log(getData)

              //  const itemArray = jsonData;
                const itemArray = getData;
                
            
                for (let shop of itemArray) {
                    console.log("hej alla")
                
                    fakeStoreEl.innerHTML += `
                
                    <article>
        <p id="image">  <img src='${shop.image}' width="300" >  </p>
        <h2 class"title" id="title" > ${shop.title} </h2>  
        <p class="classId" id="id"> Id: ${shop.id} </p>              
        <p class="price" id="price"> Price: $${shop.price} </p>
        <p id="category"> Category: ${shop.category} </p>
        <p id="description"> Description:  ${shop.description} </p>
       <p id="rate"> Rating: ${shop.rating.rate } </p>
        <p id="count"> Count: ${shop.rating.count} </p>
       


<input type="button" value="Lägg till kundvagn"  onclick="saveData('${shop.id}')">

                               
               <hr>     
                   </article>
                   
                    <hr> 
                   
                    ` 
                   
                }
                
              }

              // Funktion för att spara data i localstorage
        function saveData(id) {
          console.log(id)
         alert("Produkt tillagd i kundvagn")
          let data = id;   // Hämta data från input-elementet i formuläret
          localStorage.setItem("heading", data);  // Spara värdet från input-elementet i formuläret till localstorage-variabeln "heading"
        //  location.reload();  // Ladda om sidan
      }

      // Kontrollera om localstorage-variablen heading finns - i så fall skriv ut dess värde i rubriken
      if (localStorage.heading) {
          let value = localStorage.getItem("heading");    // Hämta värdet från localstorage och lagra i variabel
          testEl.innerHTML = value;     // Skriv ut värdet i rubriken
      }

             
       // Skapa ny order
              function createOrder (){
             //   messageIdEl.innerHTML = 'Order adderad till kundvagn'
             
                console.log("kom jag in nu då igen?")
             
                
                
               
                let userName = userNameEl.value;
                let userAdress = userAdressEl.value;
                let userMail =  userMailEl.value;
                let userFrakt = userFraktEl.value;
              //  let userId = testEl.value;
               
               
                  messageEl.innerHTML += "Grattis " + userName  + "! Din order beräknas ankomma inom tre arbetsdagar." ;
               
                names.push(userName);            
               
              console.log(userName + userMail + userAdress)
               
                // Sätt samman värden till JSON-objekt
                let body = 
                JSON.stringify(
                 {
                 "fields": {
                     "idProduct": { 
                      "integerValue":  localStorage.getItem("heading")
                    },   
                  "name": {
                    "stringValue": userName
                    // 
                    
                  } ,
                  "mail": {
                    "stringValue":userMail
                    // 
                     
                  },
                  "adress": {
                    "stringValue": userAdress 
                    //            
                },
                "fraktvillkor": {
                  "stringValue": userFrakt
                  
                }
              }         
                  }
                 
                )

               
                  
                //Skicka fetch-anrop med POST-metoden
                
                 fetch("https://firestore.googleapis.com/v1/projects/webbutik-28aae/databases/(default)/documents/fakeStore",{
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                
                  },
                  body : body 
                })
              .then(res => res.json())
              .then(data => console.log(data));
              
            } 
            

              
       //       buyEl.addEventListener("click", createProduct)         
                    
                