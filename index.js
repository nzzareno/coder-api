const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const fs = require("fs").promises;
const path = require("path");
const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("1234567890", 5);
const productosRouter = require("./routes/productosRouter");
const chatRouter = require("./routes/chatRouter");
require("dotenv").config();

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/productos", productosRouter);
app.use("/api/chat", chatRouter);

app.get("/", (req, res) => {
  fs.readFile("productos.txt", "utf-8").then((productos) => {
    res.render("form", { productos: JSON.parse(productos) });
  });
});

app.get("/:id", (req, res) => {
  fs.readFile("productos.txt", "utf-8").then((data) => {
    const type = JSON.parse(data);
    const producto = type.find((producto) => producto.id === req.params.id);
    res.render("form", {
      producto,
    });
  });
});

app.post("/", async (req, res) => {
  const productos = await fs.readFile("productos.txt", "utf-8");
  const producto = JSON.parse(productos);
  const newProducto = {
    id: nanoid(),
    price: req.body.price,
    title: req.body.title,
    thumbnail: req.body.thumbnail,
  };
  producto.push(newProducto);
  await fs.writeFile("productos.txt", JSON.stringify(producto));
  res.render("form", {
    productos: producto,
  });
});

io.on("connection", async (socket) => {
  const fs = require("fs");
  const type = await JSON.parse(fs.readFileSync("productos.txt"));
  socket.emit("new-products", type);
  socket.on("chat", async (payload) => {
    const fs = require("fs");
    const type = await JSON.parse(fs.readFileSync("chat.txt"));
    type.push(payload);
    fs.writeFile("chat.txt", JSON.stringify(type), async (err) => {
      if (err) {
        console.log(err);
      }
    });
    io.emit("chat", payload);
  });
  socket.emit("chat", await JSON.parse(fs.readFileSync("chat.txt")));
});

const port = process.env.PORT || 8080;
server
  .listen(port, () => {
    console.log(`App listening on port ${port}!`);
  })
  .on("error", (err) => {
    console.log(err);
    throw err;
  });
