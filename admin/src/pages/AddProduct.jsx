import { useState } from "react";
import Layout from "../components/Layout";
import API from "../api/axios";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "85vh",
    background: "#f8f8f8",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    background: "#fff",
    padding: "40px 30px",
    borderRadius: "4px",
    border: "1px solid #e6e6e6",
  },
  title: {
    textAlign: "center",
    fontSize: "20px",
    letterSpacing: "2px",
    marginBottom: "30px",
    fontWeight: 600,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  input: {
    width: "100%",
    padding: "14px",
    border: "1px solid #e6e6e6",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
  },
  button: {
    background: "#222",
    color: "#fff",
    padding: "14px",
    border: "none",
    fontSize: "14px",
    letterSpacing: "1px",
    cursor: "pointer",
  },
  buttonDisabled: {
    background: "#aaa",
    cursor: "not-allowed",
  },
  errorMessage: {
    background: "#f8d7da",
    color: "#721c24",
    padding: "10px",
    borderRadius: "4px",
    marginBottom: "20px",
    textAlign: "center",
  },
};

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    image: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.price) {
      setError("Product name and price are required");
      return;
    }

    try {
      setLoading(true);
      await API.post("/products", {
        name: form.name,
        price: Number(form.price),
        stock: form.stock ? Number(form.stock) : 0,
        category: form.category || "Uncategorized",
        image: form.image || ""
      });
      alert("Product Added ✅");
      setForm({ name: "", price: "", stock: "", category: "", image: "" });
    } catch (err) {
      const msg = err.response?.data?.message || "Error adding product ❌";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>ADD PRODUCT</h2>

          {error && <div style={styles.errorMessage}>{error}</div>}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Product Name *"
                value={form.name}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <div>
              <input
                type="number"
                name="price"
                placeholder="Price *"
                value={form.price}
                onChange={handleChange}
                required
                step="0.01"
                style={styles.input}
              />
            </div>

            <div>
              <input
                type="number"
                name="stock"
                placeholder="Stock (optional, default 0)"
                value={form.stock}
                onChange={handleChange}
                min="0"
                style={styles.input}
              />
            </div>

            <div>
              <input
                type="text"
                name="category"
                placeholder="Category (optional)"
                value={form.category}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div>
              <input
                type="text"
                name="image"
                placeholder="Image URL (optional)"
                value={form.image}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={loading ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
            >
              {loading ? "ADDING..." : "ADD PRODUCT"}
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
}