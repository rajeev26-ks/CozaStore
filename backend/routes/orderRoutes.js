import express from "express";
import Order from "../modal/Order.js";
import protect from "../utils/authMiddleware.js";   // default export
import adminOnly from "../utils/admin.js";  


const router = express.Router();

// GET all orders (admin only)
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
});

// GET single order by ID (admin or the user who placed it)
router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("userId", "name email");
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Check if admin OR the order belongs to the logged-in user
    const isAdmin = req.user.role === 'admin';
    const isOwner = order.userId._id.toString() === req.user.id;

    if (isAdmin || isOwner) {
      return res.status(200).json(order);
    } else {
      return res.status(403).json({ message: "Access denied" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order", error: error.message });
  }
});

// ADD order (authenticated users only)
router.post("/", protect, async (req, res) => {
  try {
    const { products, totalAmount, shippingAddress, paymentMethod } = req.body;

    if (!products || !products.length || !totalAmount) {
      return res.status(400).json({ message: "Products and total amount are required" });
    }

    const order = new Order({
      userId: req.user.id,          // from JWT token (attached by protect middleware)
      products,
      totalAmount,
      shippingAddress,
      paymentMethod,
      status: "pending"
    });

    const saved = await order.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Failed to create order", error: error.message });
  }
});

// UPDATE order status (admin only)
router.put("/:id/status", protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to update order status", error: error.message });
  }
});

// DELETE order (admin only)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete order", error: error.message });
  }
});

export default router;