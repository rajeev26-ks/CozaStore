import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // ✅ added

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ use context

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

    try {
      const response = await axios.post(
        "http://localhost:8888/api/user/login",
        {
          email: form.email,
          password: form.password
        },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 100000
        }
      );

      if (response.data.success === true) {

        // remember me
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", form.email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        // ✅ use AuthContext (single source of truth)
        login(response.data.user, response.data.token);

        await Swal.fire({
          title: "Login Successful 🎉",
          text: response.data.message || "Welcome back!",
          icon: "success",
          confirmButtonColor: "#717fe0",
        });

        navigate("/home");

      } else {
        Swal.fire({
          title: "Login Failed",
          text: response.data.message || "Login failed",
          icon: "error",
          confirmButtonColor: "#d33"
        });
      }

    } catch (error) {

      let errorMessage = "Login failed. Please try again.";

      if (error.code === "ERR_NETWORK") {
        errorMessage = "Cannot connect to server. Backend not running.";
      } else if (error.response?.status === 401) {
        errorMessage = "Invalid email or password.";
      } else if (error.response?.status === 400) {
        errorMessage = error.response.data?.message || "Missing fields";
      } else if (error.response?.status === 500) {
        errorMessage = "Server error. Try again later.";
      }

      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
        confirmButtonColor: "#d33"
      });

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
              />
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
    textAlign: "center"
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    border: "1px solid #ddd",
    borderRadius: "5px"
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#717fe0",
    color: "#fff",
    border: "none",
    borderRadius: "5px"
  },
  options: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px"
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "5px"
  },
  link: {
    color: "#717fe0",
    textDecoration: "none"
  },
  register: {
    marginTop: "20px",
    textAlign: "center"
  }
};

export default Login;