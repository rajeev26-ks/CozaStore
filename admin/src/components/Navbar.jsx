import { useNavigate } from "react-router-dom";

const styles = {
  navbar: {
    padding: "15px 20px",
    background: "#fff",
    borderBottom: "1px solid #e6e6e6",
    display: "flex",
    justifyContent: "flex-end",
  },
  logoutBtn: {
    background: "none",
    border: "1px solid #ccc",
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: "14px",
    borderRadius: "4px",
    transition: "background 0.2s",
  },
};

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>
      <button onClick={handleLogout} style={styles.logoutBtn}>
        Logout
      </button>
    </nav>
  );
}