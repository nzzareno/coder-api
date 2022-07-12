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

socket.on("goodFaker", () => {
  fetch("api/productos/test")
    .then((res) => res.json())
    .then((data) => {
      if (data.length < 1) {
        return (document.querySelector(
          ".premium-fakers"
        ).innerHTML = `<h2 class='text-center bg-warning'>Start adding some products to view the collection...</h2>`);
      } else {
        let tbody = document.querySelector(".premium-fakers");
        let thead = document.querySelector(".thead-fakers");
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
  const authorSchema = new normalizr.schema.Entity(
    "author",
    {
      id: String,
      name: String,
      lastname: String,
      alias: String,
      avatar: String,
      age: String,
      email: String,
      fecha: String,
    },
    { idAttribute: "email" }
  );
  const messageSchema = new normalizr.schema.Entity("message", {
    id: "mensajes",
  });

  const postedSchema = new normalizr.schema.Object({
    idAttribute: "id",
    author: authorSchema,
    text: messageSchema,
  });

  const postArray = new normalizr.schema.Array(postedSchema);

  fetch("http://localhost:8080/api/chat/")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      normalizr.denormalize(data.result, postedSchema, data.entities);

      const normalizedData = normalizr.normalize(data.entities, postArray);
      const normalizedDataSize = JSON.stringify(normalizedData).length;
      const dataSize = JSON.stringify(data.result).length;
      const compression = (normalizedDataSize / dataSize) * 100;

      const hache2 = document.querySelector(".titleCompress");
      hache2.innerHTML = `Compression: ${compression.toFixed(2)}%`;

      data.result.messages.forEach((message) => {
        return (chat.innerHTML += `<div class="card">
        <div class="card-header bg-light">
          <h5 class="card-title text-primary">${message.author.email}</h5>
          <h6 class="card-subtitle bg-light text-success mb-2  ">${message.author.fecha}</h6>
          <img src="${message.author.avatar}" class="rounded-circle avatar" alt="...">
        </div>
        <div class="card-body bg-dark">
          <p class="card-text text-warning bg-dark">${message.text}</p>
        </div>
      </div>
      <br>`);
      });
    });
});
