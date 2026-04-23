import { Link } from "react-router-dom";

const styles = {
  sidebar: {
    width: "250px",
    background: "#fff",
    borderRight: "1px solid #e6e6e6",
    minHeight: "100vh",
    padding: "20px",
  },
  heading: {
    fontSize: "18px",
    marginBottom: "20px",
    fontWeight: 600,
    color: "#222",
  },
  navList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  navItem: {
    marginBottom: "10px",
  },
  navLink: {
    display: "block",
    padding: "8px 12px",
    color: "#333",
    textDecoration: "none",
    fontSize: "14px",
    borderRadius: "4px",
    transition: "background 0.2s",
  },
};

export default function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <h3 style={styles.heading}>Admin Panel</h3>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/" style={styles.navLink}>Dashboard</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/products" style={styles.navLink}>Products</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/add-product" style={styles.navLink}>Add Product</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/orders" style={styles.navLink}>Orders</Link>
        </li>
      </ul>
    </div>
  );
}