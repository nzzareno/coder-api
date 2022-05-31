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
app.use(chatRouter);

app.get("/", (req, res) => {
  fs.readFile("productos.txt", "utf-8").then((data) => {
    const type = JSON.parse(data);
    res.render("form", {
      type,
    });
  });
});

app.get("/chat", (req, res) => {
  fs.readFile("chat.txt", "utf-8").then((data) => {
    const datos = JSON.parse(data);
    res.render("form", {
      datos,
    });
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
  fs.readFile("productos.txt", "utf-8")
    .then((data) => {
      const type = JSON.parse(data);
      const newProduct = {
        id: Number(nanoid()),
        price: Number(req.body.price),
        title: req.body.title,
        thumbnail: req.body.thumbnail,
      };
      type.push(newProduct);
      fs.writeFile("productos.txt", JSON.stringify(type));
      res.render("form", {
        type,
      });
    })
    .catch((err) => {
      if (!req.body.title && !req.body.price && !req.body.thumbnail) {
        res.status(400).json({
          error: "Bad Request",
          message: "Title, price and thumbnail are required",
        });
      }
      console.log(err);
    });
});

app.post("/chat", async (req, res) => {
  fs.readFile("chat.txt", "utf-8")
    .then((data) => {
      const datos = JSON.parse(data);
      const newMsj = {
        email: Number(req.body.email),
        msg: req.body.msg,
        date: req.body.date,
      };
      datos.push(newMsj);
      fs.writeFile("chat.txt", JSON.stringify(datos));
      res.render("form", {
        datos,
      });
    })
    .catch((err) => {
      if (err) {
        res.status(400).json({
          error: "Bad Request",
          message: "Email and message are required",
        });
      }
    });
});

// app.post("/chat", (req,res) => {
//   io.emit("chat", req.body.msg);
//   res.json({message: req.body.msg});
// })

io.on("connection", async (socket) => {
  console.log("New connection");
  const fs = require("fs");
  const type = await JSON.parse(fs.readFileSync("productos.txt"));
  socket.emit("new-products", type);

  socket.on("chat", async (payload) => {
    const fs = require("fs");
    const type = await JSON.parse(fs.readFileSync("chat.txt"));
    type.push(payload);
    fs.writeFile("chat.txt", JSON.stringify(type), (err) => {
      if (err) {
        console.log(err);
      } else {
        fs.readFile("chat.txt", "utf-8", async (err, data) => {
          if (err) {
            console.log(err);
          }
          const msj = await JSON.parse(data);
          return io.emit("chat", msj);
        });
      }
    });
  });
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
