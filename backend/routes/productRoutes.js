import express from "express";
import Product from "../modal/Product.js";
import protect from "../utils/authMiddleware.js";   // default export
import adminOnly from "../utils/admin.js";          // default export

const router = express.Router();

// GET ALL PRODUCTS (public)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
});

// GET SINGLE PRODUCT
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product", error: error.message });
  }
});

// ADD PRODUCT (admin only)
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const { name, price, description, stock, category, image } = req.body;
    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required" });
    }
    const product = new Product({ name, price, description, stock: stock || 0, category, image });
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Failed to add product", error: error.message });
  }
});

// UPDATE PRODUCT (admin only)
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update product", error: error.message });
  }
});

// DELETE PRODUCT (admin only)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error: error.message });
  }
});

export default router;