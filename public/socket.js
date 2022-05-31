let socket = io();

const msg = document.querySelector("#msg");
const btnChat = document.querySelector("#chatBtn");
const chat = document.querySelector("#chat");
const email = document.querySelector("#email");
const form = document.querySelector("#form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const payload = {
    email: email.value,
    msg: msg.value,
    date: new Date().toLocaleString(),
  };
  if (payload.msg.trim().length > 0) {
    socket.emit("chat", payload);
    msg.value = "";
  } else {
    alert("Message is required");
  }
});

socket.on("new-products", () => {
  fetch("api/productos")
    .then((response) => {
      return response.json();
    })
    .then(function (data) {
      if (data.length < 1) {
        return (document.querySelector(
          "tbody"
        ).innerHTML = `<h1 class='text-center'>Start adding some products to view the collection...</h1>`);
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
          img.src = product.thumbnail;
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

socket.on("chat", (payload) => {
  let correo;
  let mensajito;
  let fecha;
  payload.map(({ email, msg, date }) => {
    correo = email;
    mensajito = msg;
    fecha = date;
  });
  let li = document.createElement("li");
  li.classList.add("list-group-item");
  li.innerHTML = `<strong style="color: blue;">${correo}</strong> <span class="text-muted" style="color: brown;">${fecha}:</span>
  <p style="font-style: italic; color: green; font-weight: 500;">${mensajito}</p> 
`;
  chat.appendChild(li);
});
