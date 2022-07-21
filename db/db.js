const mongoose = require("mongoose");

const ProductsSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    default: mongoose.Types.ObjectId,
  },
  title: {
    type: String,
    required: true,
  },
  // date: { type: Date, required: true, default: new Date().toUTCString() },

  price: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});

const ProductModel = mongoose.model("Product", ProductsSchema);

const ChatSchema = mongoose.Schema({
  fecha: {
    type: Date,
    required: true,
    default: new Date().toUTCString().toString(),
  },

  email: { type: String, required: true },
  msg: { type: String, required: true },
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  alias: { type: String, required: true },
  avatar: { type: String, required: true },
  age: { type: Number, required: true },
  msg: { type: String, required: true },
  // products: { type: Array, ref: "Product" },
});

const ChatModel = mongoose.model("Chat", ChatSchema);



module.exports = {
  ProductModel,
  ChatModel,
};
