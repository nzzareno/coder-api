const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getProduct,
  makeProduct,
  removeProduct,
  removeProducts,
  updatingProduct,
  getFakerProducts,
  postFakerProducts
} = require("../controllers/products");

router.get("/", getAllProducts);

router.get("/test",  getFakerProducts);

router.post("/test",  postFakerProducts);

router.get("/:id", getProduct);

router.post("/", makeProduct);

router.patch("/:id", updatingProduct);

router.delete("/", removeProducts);

router.delete("/:id", removeProduct);

module.exports = router;
