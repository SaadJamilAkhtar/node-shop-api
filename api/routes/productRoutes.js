const express = require('express');
const router = express.Router();
const productController = require('../controller/productController')
const multer = require('multer');

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
       cb(null, './uploads/');
   },
   filename: (req,file,cb) => {
       cb(null, new Date().toISOString() + file.originalname);
   }
});

const upload = multer({storage});

router.get("/", productController.getProducts);

router.post("/", upload.single('img'), productController.addProduct);

router.get("/:id", productController.getProductById);

router.patch("/:id", productController.updateProduct);

router.delete("/:id", productController.deleteProduct);


module.exports = router;