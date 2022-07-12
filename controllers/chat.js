const Mensajes = require("../models/chat");
// const { ChatModel } = require("../db/db");
const chatService = new Mensajes("chat.json");

const getChats = async (req, res) => {
  try {
    const mensajes = await chatService.getMessages();
    return res.status(200).json(mensajes);
  } catch (error) {
    return res.status(400).json({ message: "Error getting the messages" });
  }
};

const getChat = async (req, res) => {
  try {
    const { id } = req.params;
    const mensaje = await chatService.getOneMessage(id);
    return res.status(200).json(mensaje);
  } catch (error) {
    return res.status(400).json({ message: "Error getting the message" });
  }
};

const createChat = async (req, res) => {
  try {
    await chatService.createMessages(req.body);
    return res.status(201).json({
      message: "Message created",
    });
  } catch (error) {
    return res.status(400).json({ message: "Error creating the message" });
  }
};
const deleteChat = async (req, res) => {
  try {
    const mensaje = await chatService.deleteOneMessage(req.params.id);

    return res.status(200).json({
      message: "Message deleted",
    });
  } catch (error) {
    return res.status(400).json({ message: "Error deleting the message" });
  }
};
const deleteChats = async (req, res) => {
  try {
    await chatService.deleteAllMessages();
    return res.status(200).json({
      message: "Messages deleted",
    });
  } catch (error) {
    return res.status(400).json({ message: "Error deleting the messages" });
  }
};
const updateChat = async (req, res) => {
  try {
    const { id } = req.params;
    const mensaje = await chatService.updateOneMessage(id, req.body);

    return res.status(200).json({
      message: "Message updated",
    });
  } catch (error) {
    return res.status(400).json({ message: "Error updating the message" });
  }
};

module.exports = {
  getChats,
  getChat,
  createChat,
  deleteChat,
  deleteChats,
  updateChat,
};
