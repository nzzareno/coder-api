let socket = io();
const msg = document.querySelector("#msg");
const btnChat = document.querySelector("#chatBtn");
const chat = document.querySelector("#chat");
const email = document.querySelector("#email");
const namex = document.querySelector("#name");
const lastname = document.querySelector("#lastname");
const age = document.querySelector("#age");
const alias = document.querySelector("#alias");
const avatar = document.querySelector("#avatar");
const form = document.querySelector("#form");
const formx = document.querySelector("#formx");
 

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (email.value === "" || msg.value === "") {
    alert("Email and message are required");
  } else {
    socket.emit("chat", {
      email: email.value,
      msg: msg.value,
      name: namex.value,
      lastname: lastname.value,
      age: age.value,
      alias: alias.value,
      avatar: avatar.value,
    });
    msg.value = "";
  }
});

// socket.on("goodFaker", () => {
//   fetch("api/productos/test")
//     .then((res) => res.json())
//     .then((data) => {
//       if (data.length < 1) {
//         return (document.querySelector(
//           ".premium-fakers"
//         ).innerHTML = `<h2 class='text-center bg-warning'>Start adding some products to view the collection...</h2>`);
//       } else {
//         let tbody = document.querySelector(".premium-fakers");
//         let thead = document.querySelector(".thead-fakers");
//         let tr = document.createElement("tr");
//         let th = document.createElement("th");
//         th.innerHTML = "#";
//         th.setAttribute("scope", "col");
//         tr.appendChild(th);
//         th = document.createElement("th");
//         th.innerHTML = "Title";
//         th.setAttribute("scope", "col");
//         tr.appendChild(th);
//         th = document.createElement("th");
//         th.innerHTML = "Price";
//         th.setAttribute("scope", "col");
//         tr.appendChild(th);
//         th = document.createElement("th");
//         th.innerHTML = "     Preview";
//         th.setAttribute("scope", "col");
//         tr.classList.add("text-center");
//         tr.appendChild(th);
//         thead.appendChild(tr);
//         data.forEach((product) => {
//           let tr = document.createElement("tr");
//           tr.classList.add("text-center");
//           let th = document.createElement("th");
//           th.setAttribute("scope", "row");
//           th.innerHTML = product.id;
//           let td2 = document.createElement("th");
//           td2.setAttribute("scope", "row");
//           let td3 = document.createElement("th");
//           td3.setAttribute("scope", "row");
//           let td4 = document.createElement("th");
//           td4.setAttribute("scope", "row");
//           let img = document.createElement("img");
//           img.src = product.img;
//           img.style.width = "80px";
//           img.style.height = "80px";
//           td2.innerText = product.title;
//           td3.innerText = `$${product.price}`;
//           td4.appendChild(img);
//           tr.appendChild(th);
//           tr.appendChild(td2);
//           tr.appendChild(td3);
//           tr.appendChild(td4);
//           tbody.appendChild(tr);
//         });
//       }
//     });
// });

socket.on("new-products", () => {
  fetch("api/productos")
    .then((response) => {
      return response.json();
    })
    .then(function (data) {
      if (data.length < 1) {
        return (document.querySelector(
          "tbody"
        ).innerHTML = `<h2 class='text-center bg-warning'>Start adding some products to view the collection...</h2>`);
      } else {
        let tbody = document.querySelector("tbody");
        let thead = document.querySelector("thead");
        let tr = document.createElement("tr");
        let th = document.createElement("th");
        th.innerHTML = "#";
        th.setAttribute("scope", "col");
        tr.appendChild(th);
        th = document.createElement("th");
        th.innerHTML = "Title";
        th.setAttribute("scope", "col");
        tr.appendChild(th);
        th = document.createElement("th");
        th.innerHTML = "Price";
        th.setAttribute("scope", "col");
        tr.appendChild(th);
        th = document.createElement("th");
        th.innerHTML = "     Preview";
        th.setAttribute("scope", "col");
        tr.classList.add("text-center");
        tr.appendChild(th);
        thead.appendChild(tr);
        data.forEach((product) => {
          let tr = document.createElement("tr");
          tr.classList.add("text-center");
          let th = document.createElement("th");
          th.setAttribute("scope", "row");
          th.innerHTML = product.id;
          let td2 = document.createElement("th");
          td2.setAttribute("scope", "row");
          let td3 = document.createElement("th");
          td3.setAttribute("scope", "row");
          let td4 = document.createElement("th");
          td4.setAttribute("scope", "row");
          let img = document.createElement("img");
          img.src = product.img;
          img.style.width = "80px";
          img.style.height = "80px";
          td2.innerText = product.title;
          td3.innerText = `$${product.price}`;
          td4.appendChild(img);
          tr.appendChild(th);
          tr.appendChild(td2);
          tr.appendChild(td3);
          tr.appendChild(td4);
          tbody.appendChild(tr);
        });
      }
    });
});

socket.on("chat", () => {
  fetch("http://localhost:8080/api/chat/")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.forEach((message) => {
        return (chat.innerHTML += `<div class="card">
        <div class="card-header bg-light">
          <h5 class="card-title text-primary">${message.email}</h5>
          <h6 class="card-subtitle bg-light text-success mb-2  ">${message.fecha}</h6>
          <img src="${message.avatar}" class="rounded-circle avatar" alt="...">
        </div>
        <div class="card-body bg-dark">
          <p class="card-text text-warning bg-dark">${message.msg}</p>
        </div>
      </div>
      <br>`);
      });
    });
});
