import { useEffect, useState } from "react";
import Layout from "../components/Layout";

const styles = {
  container: {
    padding: "40px 20px",
    background: "#f8f8f8",
    minHeight: "100vh",
  },
  title: {
    textAlign: "center",
    fontSize: "22px",
    letterSpacing: "2px",
    marginBottom: "30px",
    fontWeight: 600,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#fff",
    border: "1px solid #e6e6e6",
    padding: "20px",
    borderRadius: "4px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  info: {
    marginBottom: "10px",
  },
  productName: {
    fontSize: "16px",
    marginBottom: "10px",
  },
  productPrice: {
    fontSize: "14px",
    color: "#666",
  },
  deleteBtn: {
    marginTop: "15px",
    padding: "10px",
    background: "#222",
    color: "#fff",
    border: "none",
    fontSize: "13px",
    cursor: "pointer",
  },
};

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8888/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const deleteProduct = async (id) => {
    try {
      await fetch(`http://localhost:8888/api/products/${id}`, {
        method: "DELETE",
      });
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      alert("Error deleting product ❌");
    }
  };

  return (
    <Layout>
      <section style={styles.container}>
        <h2 style={styles.title}>PRODUCTS</h2>
        <div style={styles.grid}>
          {products.map((p) => (
            <div key={p._id} style={styles.card}>
              <div style={styles.info}>
                <h3 style={styles.productName}>{p.name}</h3>
                <p style={styles.productPrice}>₹{p.price}</p>
              </div>
              <button style={styles.deleteBtn} onClick={() => deleteProduct(p._id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}