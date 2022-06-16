const express = require("express");
const router = express.Router();
 
const {
  getAllProducts,
  getProduct,
  makeProduct,
  removeProduct,
  removeProducts,
  updatingProduct,
} = require("../controllers/products");

router.get("/", getAllProducts);

router.get("/:id", getProduct);

router.post("/", makeProduct);

router.patch("/:id", updatingProduct);

router.delete("/", removeProducts);

router.delete("/:id", removeProduct);

module.exports = router;
