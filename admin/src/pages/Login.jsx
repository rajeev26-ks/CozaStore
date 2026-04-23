import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "#f8f8f8",
    padding: "20px",
  },
  form: {
    width: "100%",
    maxWidth: "400px",
    background: "#fff",
    padding: "40px 30px",
    borderRadius: "4px",
    border: "1px solid #e6e6e6",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },
  heading: {
    textAlign: "center",
    fontSize: "24px",
    marginBottom: "25px",
    fontWeight: 600,
    color: "#222",
  },
  error: {
    background: "#f8d7da",
    color: "#721c24",
    padding: "10px",
    borderRadius: "4px",
    marginBottom: "20px",
    textAlign: "center",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    marginBottom: "15px",
    border: "1px solid #e6e6e6",
    borderRadius: "4px",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#222",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "background 0.3s",
  },
  buttonDisabled: {
    background: "#aaa",
    cursor: "not-allowed",
  },
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/auth/login", { email, password });
      localStorage.setItem("adminToken", res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Admin Login</h2>
        {error && <div style={styles.error}>{error}</div>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button
          type="submit"
          disabled={loading}
          style={loading ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}