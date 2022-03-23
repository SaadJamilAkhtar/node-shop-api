const express = require('express');
const router = express.Router();
const productController = require('../controller/productController')


router.get("/", productController.getProducts);

router.post("/", productController.addProduct);

router.get("/:id", productController.getProductById);

router.patch("/:id", productController.updateProduct);

router.delete("/:id", productController.deleteProduct);


module.exports = router;