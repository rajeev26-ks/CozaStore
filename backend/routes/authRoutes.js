import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../modal/userSchema.js";

const router = express.Router();

// Hardcoded admin credentials (for testing / development)
const HARDCODED_ADMIN = {
  email: "admin@example.com",
  password: "admin123",   // plain text, will compare directly
  name: "Super Admin",
  isAdmin: true
};

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // 2. Check hardcoded admin first (for easy login)
    if (email === HARDCODED_ADMIN.email && password === HARDCODED_ADMIN.password) {
      const token = jwt.sign(
        {
          userId: "hardcoded_admin_id",
          email: HARDCODED_ADMIN.email,
          isAdmin: true
        },
        process.env.JWT_SECRET || "fallback_secret_key",
        { expiresIn: "7d" }
      );
      return res.json({
        token,
        user: {
          id: "hardcoded_admin_id",
          name: HARDCODED_ADMIN.name,
          email: HARDCODED_ADMIN.email,
          isAdmin: true
        }
      });
    }

    // 3. Check database for user (if not hardcoded admin)
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 4. Verify password (hashed in DB)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 5. Generate JWT token for DB user
    const token = jwt.sign(
      { userId: user._id, email: user.email, isAdmin: user.isAdmin || false },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;