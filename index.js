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
    fs.readFile("chat.txt", "utf-8")
      .then((chat) => {
        res.render("form", {
          productos: JSON.parse(productos),
          chat: JSON.parse(chat),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

// app.get("/chat", (req, res) => {
//   fs.readFile("chat.txt", "utf-8").then((data) => {
//     const datos = JSON.parse(data);
//     res.render("form", {
//       datos,
//     });
//   });
// });

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
  const chat = await fs.readFile("chat.txt", "utf-8");
  const producto = JSON.parse(productos);
  const chatData = JSON.parse(chat);
  const newProducto = {
    id: nanoid(),
    price: req.body.price,
    title: req.body.title,
    thumbnail: req.body.thumbnail,
  };
  producto.push(newProducto);
  const newChat = {
    email: req.body.email,
    msg: req.body.msg,
    date: req.body.date,
  };
  chatData.push(newChat);
  const items = await fs.writeFile("productos.txt", JSON.stringify(producto));
  const chatDato = await fs.writeFile("chat.txt", JSON.stringify(chatData));
  res.render("form", {
    items,
    chatDato,
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
      socket.emit("chat", type);
    });


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
