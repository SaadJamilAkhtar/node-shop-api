const express = require('express');
const router = express.Router();
const productController = require('../controller/productController')
const multer = require('multer');
const protect = require('../middleware/authMiddleware');


// storage details
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + "_" + file.originalname);
    }
});

// File filter
const fileFilter = (req, file, cb) => {
    // reject file
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true)
    } else {
        cb(new Error("Only jpeg and png files allowed"), false)
    }
}

// config multer
const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // max size = 5MB
    },
    fileFilter
});

router.get("/", productController.getProducts);

router.post("/", protect, upload.single('img'), productController.addProduct);

router.get("/:id", productController.getProductById);

router.patch("/:id", protect, upload.single('img'), productController.updateProduct);

router.delete("/:id", protect, productController.deleteProduct);


module.exports = router;