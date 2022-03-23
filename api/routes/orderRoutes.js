const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController')

router.get("/",orderController.getOrders);

router.post("/",orderController.addOrder);

router.get("/:id",orderController.getOrderById);

router.delete("/:id",orderController.deleteOrder);


module.exports = router;