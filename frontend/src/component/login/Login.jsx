// Login.jsx - Complete working version
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setForm(prev => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    console.log("=== LOGIN ATTEMPT ===");
    console.log("Email:", form.email);
    console.log("Password:", "***");
    
    try {
      const response = await axios.post(
        "http://localhost:8888/api/user/login",
        {
          email: form.email,
          password: form.password
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 100000
        }
      );
      
      console.log("Response status:", response.status);
      console.log("Response data:", response.data);
      
      if (response.data.success === true) {
        // Handle remember me
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", form.email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }
        
        // Store token if exists
        if (response.data.token) {
          localStorage.setItem("authToken", response.data.token);
        }
        
        // Store user data
        if (response.data.user) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
        
        toast.success(response.data.message || "Login successful ✅");
        
        // Redirect to dashboard
        setTimeout(() => {
          navigate("/home");
        }, 500);
      } else {
        toast.error(response.data.message || "Login failed");
      }
      
    } catch (error) {
      console.error("Login error details:", error);
      
      if (error.code === "ERR_NETWORK") {
        toast.error("Cannot connect to server. Make sure backend is running on port 8888");
      } else if (error.response?.status === 401) {
        toast.error("Invalid email or password. Please try again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data?.message || "Please provide email and password");
      } else if (error.response?.status === 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error(error.response?.data?.message || "Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>User Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <div style={styles.options}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />{" "}
              Remember me
            </label>
            <Link to="/forgot-password" style={styles.link}>
              Forgot Password?
            </Link>
          </div>

          <button 
            type="submit" 
            style={{
              ...styles.button,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer"
            }} 
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p style={styles.register}>
            Don't have an account?{" "}
          <Link to="/signup" style={styles.link}>Create one</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f1f1f1",
    margin: 0,
    padding: "20px"
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    background: "#fff",
    padding: "35px 30px",
    borderRadius: "10px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)"
  },
  title: {
    marginBottom: "20px",
    color: "#333",
    textAlign: "center",
    fontSize: "24px"
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "14px",
    boxSizing: "border-box"
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#717fe0",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "15px",
    cursor: "pointer",
    transition: "all 0.3s ease"
  },
  options: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    fontSize: "14px"
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    cursor: "pointer"
  },
  link: {
    color: "#717fe0",
    textDecoration: "none",
    cursor: "pointer"
  },
  register: {
    marginTop: "20px",
    fontSize: "14px",
    textAlign: "center",
    color: "#666"
  }
};

export default Login;