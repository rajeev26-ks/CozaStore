import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [0, "Price cannot be negative"]
  },
  category: {
    type: String,
    required: false,
    default: "Uncategorized"
  },
  image: {
    type: String,
    required: false  // URL or path
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
    min: [0, "Stock cannot be negative"]
  }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);