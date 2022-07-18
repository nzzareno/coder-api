const Productos = require("../models/products");
const { ProductModel } = require("../db/db");
const itemService = new Productos(ProductModel);

const getAllProducts = async (req, res) => {
  try {
    const productos = await itemService.getTheProducts();
    return res.status(200).json(productos);
  } catch (error) {
    return res.status(400).json({ message: "Error getting the products" });
  }
};

const getFakerProducts = async (req, res) => {
  try {
    const fakerP = await itemService.getFakeProducts();
    return res.status(200).json(fakerP);
  } catch (error) {
    return res.status(400).json({ message: "Error getting the products" });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await itemService.getOneProduct(id);
    return res.status(200).json(producto);
  } catch (error) {
    return res.status(400).json({ message: "Error getting the product" });
  }
};

const makeProduct = async (req, res) => {
  try {
    await itemService.createTheProducts(req.body);
    return res.status(201).json({
      message: "Product created",
    });
  } catch (error) {
    return res.status(400).json({ message: "Error creating the product" });
  }
};

const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await itemService.deleteOneProduct(id);
    return res.status(200).json({
      message: "Product deleted",
    });
  } catch (error) {
    return res.status(400).json({ message: "Error deleting the product" });
  }
};

const removeProducts = async (req, res) => {
  try {
    await itemService.deleteAllProducts();
    return res.status(200).json({
      message: "Products deleted",
    });
  } catch (error) {
    return res.status(400).json({ message: "Error deleting the products" });
  }
};

const updatingProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await itemService.updateOneProduct(id, req.body);
    return res.status(200).json(producto);
  } catch (error) {
    return res.status(400).json({ message: "Error updating the product" });
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  makeProduct,
  removeProduct,
  removeProducts,
  updatingProduct,
  getFakerProducts,
};
