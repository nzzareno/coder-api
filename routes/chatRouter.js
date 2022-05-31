const express = require("express");
const Mensajes = require("../apichat");
const router = express.Router();
const chatService = new Mensajes("chat.txt");

router.get("/", async (req, res) => {
  res.json(await chatService.obtenerMensajes());
  
});

router.post("/", async (req, res) => {
  const producto = chatService.createMsg(req.body);
  res.json(await producto);
});

router.delete("/", async (req, res) => {
  chatService.eliminarTodosMsg();
  res.json({ message: "Message removed" });
});

module.exports = router;
