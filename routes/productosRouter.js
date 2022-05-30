const express = require("express");
const Productos = require("../api");
const router = express.Router();
const itemService = new Productos("productos.txt");

router.get("/", async (req, res) => {
  res.json(await itemService.obtenerProductos());
});

router.post("/", async (req, res) => {
  if (!req.body.title && !req.body.price && !req.body.thumbnail) {
    res.status(400).json({
      error: "Bad Request",
      message: "Title, price and thumbnail are required",
    });
  }
  const producto = itemService.create(req.body);
  res.json(await producto);
});

router.put("/", async (req, res) => {
  const producto = itemService.actualizarTodos();
  res.json(await producto);
});

router.delete("/", async (req, res) => {
  itemService.eliminarTodos();
  res.json({ message: "Product removed" });
});

router.get("/:id", async (req, res) => {
  const producto = await itemService.obtenerProducto(req.params.id);
  res.json(producto);
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const producto = itemService.actualizarProducto(id, req.body);
  res.json(await producto);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  itemService.eliminarProducto(id);
  res.json({ message: "Product removed" });
});

module.exports = router;
