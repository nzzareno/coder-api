require("dotenv").config();
const { ProductModel } = require("./db/db");
const { ChatModel } = require("./db/db");
// require("./db/config");
const dbProductos = require("./models/products");
const dbMensajes = require("./models/chat");
const itemService = new dbProductos("productos.json");
const chatService = new dbMensajes("chat.json");
// const scriptCreateTables = require("./scriptCreateTables");
// scriptCreateTables.tablesCreation();
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require("path");
const productosRouter = require("./routes/productosRouter");
const chatRouter = require("./routes/chatRouter");

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/productos", productosRouter);
app.use("/api/chat", chatRouter);

app.get("/", (req, res) => {
  return res.render("form");
});

app.post("/", async (req, res) => {
  const { title, price, img } = req.body;
  const producto = {
    title,
    price,
    img,
  };
  const productoInKnex = await itemService.createTheProducts(producto);
  return res.render("form", {
    productoInKnex,
  });
});

io.on("connection", async (socket) => {
  // socket.emit("new-products", await itemService.getTheProducts());

  socket.emit("goodFaker", await itemService.getFakeProducts());

  socket.on("chat", async (payload) => {
    const mensaje = await chatService.createMessages(payload);
    socket.emit("chat", mensaje);
  });
  socket.emit("chat", await chatService.getMessages());
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
