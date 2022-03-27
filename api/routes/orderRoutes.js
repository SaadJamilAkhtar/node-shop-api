const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController')
const protect = require('../middleware/authMiddleware');

router.get("/", protect, orderController.getOrders);

router.post("/", protect, orderController.addOrder);

router.get("/:id", protect, orderController.getOrderById);

router.delete("/:id", protect, orderController.deleteOrder);


module.exports = router;