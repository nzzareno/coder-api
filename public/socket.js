let socket = io();

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

document.querySelector("form").addEventListener("input", function (e) {
  const tgt = e.target;
  if (tgt.type && tgt.type === "number") {
    const val = tgt.value;
    const nums = val.replace(/[^\d.-]/g, "");
    if (!/\d+/.test(val)) tgt.value = "";
  }
  const showButton = document.getElementById("button-show");
  showButton.addEventListener("click", function () {});
});

if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}