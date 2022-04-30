const path = require("path");

const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products/:productId", shopController.getProductById);

// router.get("/products", shopController.getProducts);

// router.get("/cart", shopController.getCart);

// router.post("/cart", shopController.addToCart);

// router.post("/cart-delete-item", shopController.postDeleteCart);

// router.get("/orders", shopController.getOrders);

// router.post("/create-order", shopController.postOrder);

// router.get("/checkout", shopController.getCheckout);

module.exports = router;
