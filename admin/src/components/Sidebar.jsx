import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <h2>Admin</h2>

      <Link to="/">Dashboard</Link>
      <Link to="/products">Products</Link>
      <Link to="/add-product">Add Product</Link>
      <Link to="/orders">Orders</Link>
  
    </div>
  );
}

const styles = {
  sidebar: {
    width: "220px",
    height: "100vh",
    background: "#1e1e2f",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    padding: "20px",
  },
};