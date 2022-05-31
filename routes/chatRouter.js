const express = require("express");
const Mensajes = require("../apichat");
const router = express.Router();
const chatService = new Mensajes("chat.txt");

router.get("/chat", async (req, res) => {
  res.json(await chatService.obtenerMensajes());
});

router.post("/chat", async (req, res) => {
  const producto = chatService.createMsg(req.body);
  res.json(await producto);
});

router.delete("/chat", async (req, res) => {
  chatService.eliminarTodos();
  res.json({ message: "Product removed" });
});

module.exports = router;
