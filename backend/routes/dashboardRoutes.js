import express from "express";
import Product from "../modal/Product.js";
import Order from "../modal/Order.js";
import User from "../modal/userSchema.js";  // adjust path as needed
import protect from "../utils/authMiddleware.js";
import adminOnly from "../utils/admin.js";

const router = express.Router();

router.get("/stats", protect, adminOnly, async (req, res) => {
  try {
    const products = await Product.countDocuments();
    const orders = await Order.countDocuments();
    const users = await User.countDocuments();

    // Optional: calculate total sales/revenue
    const allOrders = await Order.find({ status: { $ne: "cancelled" } });
    const totalSales = allOrders.reduce((sum, order) => sum + order.totalAmount, 0);

    res.json({
      products,
      orders,
      users,
      totalSales
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dashboard stats", error: error.message });
  }
});

// Optional: recent orders for dashboard widget
router.get("/recent-orders", protect, adminOnly, async (req, res) => {
  try {
    const recentOrders = await Order.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .limit(5);
    res.json(recentOrders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch recent orders", error: error.message });
  }
});

export default router;