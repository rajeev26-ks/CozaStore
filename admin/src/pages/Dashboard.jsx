import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../api/axios";

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
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#fff",
    border: "1px solid #e6e6e6",
    padding: "30px 20px",
    textAlign: "center",
    borderRadius: "4px",
  },
  cardH3: {
    fontSize: "14px",
    letterSpacing: "1px",
    marginBottom: "10px",
    color: "#555",
  },
  cardP: {
    fontSize: "26px",
    fontWeight: 600,
    color: "#222",
  },
  error: {
    textAlign: "center",
    color: "red",
    marginTop: "20px",
  },
};

export default function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    users: 0,
    orders: 0,
    totalSales: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError("");

      // Optional: check if token exists before making request
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You are not logged in. Please log in to view dashboard.");
        setLoading(false);
        return;
      }

      const { data } = await API.get("/dashboard/stats");
      setStats(data);
    } catch (err) {
      // Handle different error scenarios
      if (!err.response) {
        // Network error (server down, no internet, etc.)
        setError(
          "Cannot connect to the server. Please check your internet connection or make sure the backend is running on port 8888."
        );
        console.error("Network error:", err);
      } else if (err.response.status === 401) {
        // Unauthorized – token missing, invalid, or expired
        setError("Your session has expired. Please log in again.");
        localStorage.removeItem("token");
        // Optional: redirect to login page
        // navigate("/login");
      } else if (err.response.status === 403) {
        setError("You do not have permission to view dashboard stats (admin only).");
      } else if (err.response.status === 404) {
        setError("Dashboard stats endpoint not found. Please check the API route.");
      } else {
        // Any other server error (500, etc.)
        setError(
          err.response?.data?.message || "Failed to load dashboard stats. Please try again."
        );
      }
      console.error("Dashboard fetch error:", err.response?.status, err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Layout><div>Loading dashboard...</div></Layout>;
  if (error) return <Layout><div style={styles.error}>{error}</div></Layout>;

  return (
    <Layout>
      <section style={styles.container}>
        <h2 style={styles.title}>DASHBOARD</h2>
        <div style={styles.grid}>
          <div style={styles.card}>
            <h3 style={styles.cardH3}>Products</h3>
            <p style={styles.cardP}>{stats.products}</p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardH3}>Users</h3>
            <p style={styles.cardP}>{stats.users}</p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardH3}>Orders</h3>
            <p style={styles.cardP}>{stats.orders}</p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardH3}>Total Sales</h3>
            <p style={styles.cardP}>₹{stats.totalSales}</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}