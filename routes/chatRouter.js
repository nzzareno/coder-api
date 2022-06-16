const express = require("express");
const router = express.Router();
const {
  getChats,
  getChat,
  createChat,
  deleteChat,
  deleteChats,
  updateChat,
} = require("../controllers/chat");

router.get("/", getChats);

router.post("/", createChat);

router.delete("/", deleteChats);

router.put("/:id", updateChat);

router.get("/:id", getChat);

router.delete("/:id", deleteChat);

module.exports = router;
