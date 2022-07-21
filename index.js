require("dotenv").config();
const { ProductModel } = require("./db/db");
const { ChatModel } = require("./db/db");
const User = require("./models/users");
require("./db/config");
const dbProductos = require("./models/products");
const dbMensajes = require("./models/chat");
const itemService = new dbProductos(ProductModel);
const chatService = new dbMensajes(ChatModel);
const express = require("express");
const MongoStore = require("connect-mongo");
const morgan = require("morgan");
const app = express();
const session = require("express-session");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require("path");
const { hashPassword, comparePassword, authVerified } = require("./utils/keys");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const flash = require("connect-flash");
const productosRouter = require("./routes/productosRouter");
const chatRouter = require("./routes/chatRouter");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/api/productos", productosRouter);
app.use("/api/chat", chatRouter);
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      ttl: 600,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// PASSPORT CONFIG
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// PASSPORT STRATEGYS

passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      return User.findOne({ email })
        .then((user) => {
          if (user) {
            return done(null, false, { message: "User already exists" });
          }
          const newUser = new User();
          newUser.email = email;
          newUser.password = hashPassword(password);

          return newUser.save();
        })
        .then((user) => {
          return done(null, user);
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      return User.findOne({ email })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: "User not found" });
          }
          if (!comparePassword(user.password, password)) {
            return done(null, false, { message: "Password incorrect" });
          }

          return done(null, user);
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);

// SERIALIZACION Y DESERIALIZACION + MIDDLEWARE PARA RUTA GET /
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      return done(null, user);
    })
    .catch((err) => {
      return done(err);
    });
});

app.post("/", async (req, res) => {
  const { title, price, img } = req.body;
  const producto = {
    title,
    price,
    img,
  };
  const productoInKnex = await itemService.createTheProducts(producto);
  res.render("form", {
    productoInKnex,
  });
});

app.get("/", authVerified, (req, res) => {
  return res.render("form", {
    user: req.user.email,
  });
});

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  })
});

app.get("/register", (req, res) => {
  res.render("register", {
    message: req.flash("error"),
  });
});

app.get("/login", (req, res) => {
  res.render("login", {
    message: req.flash("error"),
  });
});

app.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

app.post(
  "/register",
  passport.authenticate("register", {
    successRedirect: "/login",
    failureRedirect: "/register",
    failureFlash: true,
  })
);

io.on("connection", async (socket) => {
  socket.emit("new-products", await itemService.getTheProducts());

  // socket.emit("goodFaker", await itemService.getFakeProducts());

  socket.on("chat", async (payload) => {
    const mensaje = await chatService.createMessages(payload);
    socket.emit("chat", mensaje);
  });
  socket.emit("chat", await chatService.getMessages());
});
const port = 8081;
server
  .listen(port, () => {
    console.log(`App listening on port ${port}!`);
  })
  .on("error", (err) => {
    console.log(err);
    throw err;
  });
