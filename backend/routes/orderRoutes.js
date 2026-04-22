import express from "express";
import Order from "../modal/Order.js";

const router = express.Router();

// GET all orders
router.get("/", async (req, res) => {
 const orders = await Order.find().populate("userId", "name email");
  res.json(orders);
});

// ADD order
router.post("/", async (req, res) => {
  const order = new Order(req.body);
  const saved = await order.save();
  res.json(saved);
});

export default router;