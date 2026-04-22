import express from "express";
import Product from "../modal/Product.js";
import Order from "../modal/Order.js";

const router = express.Router();

router.get("/stats", async (req, res) => {
  const products = await Product.countDocuments();
  const orders = await Order.countDocuments();

  res.json({ products, users, orders });
});

export default router;